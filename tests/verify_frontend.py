from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:8000/trabajos/index.html")

    # Verify title
    print(f"Page title: {page.title()}")
    assert "Portafolio" in page.title()

    # Verify the links are correct
    # Desmontar y Montar un PC
    link1 = page.locator("a[aria-label='Ver PDF Desmontar y Montar un PC']")
    href1 = link1.get_attribute("href")
    print(f"Link 1 href: {href1}")
    assert "Desmontar%20y%20Montar%20un%20PC%20-%20Luis%20Sedano.pdf" in href1 or "Desmontar y Montar un PC - Luis Sedano.pdf" in href1
    # Check it doesn't start with http
    assert not href1.startswith("http")

    # Desmontar y Montar un Servidor
    link2 = page.locator("a[aria-label='Ver PDF Desmontar y Montar un Servidor']")
    href2 = link2.get_attribute("href")
    print(f"Link 2 href: {href2}")
    assert "Desmontar%20y%20Montar%20un%20Servidor%20-%20Luis%20Sedano.pdf" in href2 or "Desmontar y Montar un Servidor - Luis Sedano.pdf" in href2
    assert not href2.startswith("http")

    # Crear una web estática en Github
    link3 = page.locator("a[aria-label='Ver PDF Crear web en Github']")
    href3 = link3.get_attribute("href")
    print(f"Link 3 href: {href3}")
    assert "Crear%20una%20web%20estática%20en%20Github%20-%20Luis%20Sedano.pdf" in href3 or "Crear una web estática en Github - Luis Sedano.pdf" in href3
    assert not href3.startswith("http")

    # Take screenshot
    page.screenshot(path="frontend_verification.png", full_page=True)
    print("Screenshot saved to frontend_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
