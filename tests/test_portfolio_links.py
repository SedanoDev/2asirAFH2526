import os
import re
import pytest

def get_proyectos_files():
    index_path = os.path.join('trabajos', 'index.html')
    if not os.path.exists(index_path):
        return []
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the PROYECTOS_FILES array
    match = re.search(r'const PROYECTOS_FILES = \[(.*?)\];', content, re.DOTALL)
    if not match:
        return []

    files_str = match.group(1)
    # Extract strings within quotes
    files = re.findall(r"['\"](.*?)['\"]", files_str)
    return files

def test_proyectos_files_not_empty():
    assert len(get_proyectos_files()) > 0, "PROYECTOS_FILES array should not be empty"

@pytest.mark.parametrize("file_path", get_proyectos_files())
def test_file_exists(file_path):
    # Verify relative to trabajos/ directory
    full_path = os.path.join('trabajos', file_path)
    assert os.path.exists(full_path), f"File {full_path} does not exist"

@pytest.mark.parametrize("file_path", [f for f in get_proyectos_files() if f.endswith('.html')])
def test_no_placeholders_in_html(file_path):
    full_path = os.path.join('trabajos', file_path)
    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    placeholders = ['URL_AL_', 'TODO', 'FIXME']
    for placeholder in placeholders:
        assert placeholder not in content, f"Found placeholder '{placeholder}' in {full_path}"
