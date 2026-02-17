import os
import sys
import urllib.parse
from bs4 import BeautifulSoup

# Define repository root
# Since this script is in tests/, the repo root is the parent directory
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TRABAJOS_DIR = os.path.join(REPO_ROOT, 'trabajos')
REPO_URL_PREFIX = "https://sedanodev.github.io/2asirAFH2526/"

def get_html_files(directory):
    html_files = []
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            if filename.lower().endswith('.html'):
                html_files.append(os.path.join(root, filename))
    return html_files

def resolve_path(base_file_path, link_url):
    """
    Resolves a link URL to a local file path.
    """
    # Remove query parameters and fragments
    clean_url = link_url.split('#')[0].split('?')[0]

    # URL Decode
    clean_url = urllib.parse.unquote(clean_url)

    # 1. Handle Full URL pointing to this repo
    if clean_url.startswith(REPO_URL_PREFIX):
        rel_path = clean_url[len(REPO_URL_PREFIX):]
        # If the URL ends with /, it might mean index.html
        if rel_path.endswith('/'):
             rel_path += 'index.html'
        return os.path.join(REPO_ROOT, rel_path)

    # 2. Handle External URLs
    parsed = urllib.parse.urlparse(clean_url)
    if parsed.scheme in ('http', 'https', 'ftp', 'mailto', 'tel'):
        return None  # External link, ignore

    # 3. Handle Absolute Paths (root-relative)
    if clean_url.startswith('/'):
        # Relative to repository root
        # Remove leading slash to join correctly
        return os.path.join(REPO_ROOT, clean_url.lstrip('/'))

    # 4. Handle Relative Paths
    # Relative to the file containing the link
    base_dir = os.path.dirname(base_file_path)
    return os.path.join(base_dir, clean_url)

def check_file_exists(path):
    """
    Checks if a file exists at the given path.
    Handles implied extensions (.html) and directory indexes (index.html).
    """
    if os.path.exists(path):
        if os.path.isdir(path):
            # If it's a directory, look for index.html
            index_path = os.path.join(path, 'index.html')
            return os.path.exists(index_path)
        return True

    # Try appending .html if no extension
    if not os.path.splitext(path)[1]:
        html_path = path + '.html'
        if os.path.exists(html_path):
            return True

    return False

def check_links_in_file(file_path):
    errors = []
    rel_file_path = os.path.relpath(file_path, REPO_ROOT)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                content = f.read()
        except Exception as e:
            errors.append(f"Could not read file {rel_file_path}: {e}")
            return errors

    soup = BeautifulSoup(content, 'html.parser')

    # Elements to check: <a> href, <img> src, <link> href, <script> src
    elements_to_check = [
        ('a', 'href'),
        ('img', 'src'),
        ('link', 'href'),
        ('script', 'src'),
        ('iframe', 'src'),
        ('source', 'src')
    ]

    for tag, attr in elements_to_check:
        for element in soup.find_all(tag):
            url = element.get(attr)
            if not url:
                continue

            # Skip empty links, anchors, javascript
            if not url.strip() or url.startswith('#') or url.lower().startswith('javascript:'):
                continue

            resolved_path = resolve_path(file_path, url)

            # None means it's external or validly ignored
            if resolved_path is None:
                continue

            if not check_file_exists(resolved_path):
                # Format error message
                errors.append(f"Broken link in {rel_file_path}: <{tag} {attr}='{url}'> -> resolved to {os.path.relpath(resolved_path, REPO_ROOT)}")

    return errors

def main():
    print(f"Scanning for broken links in {TRABAJOS_DIR}...")

    html_files = get_html_files(TRABAJOS_DIR)
    all_errors = []

    if not html_files:
        print("No HTML files found.")
        sys.exit(0)

    print(f"Found {len(html_files)} HTML files.")

    for file_path in html_files:
        file_errors = check_links_in_file(file_path)
        all_errors.extend(file_errors)

    if all_errors:
        print(f"\n❌ Found {len(all_errors)} broken links:")
        for error in all_errors:
            print(f"  - {error}")
        sys.exit(1)
    else:
        print("\n✅ All internal links verified successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()
