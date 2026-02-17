import pytest
from bs4 import BeautifulSoup
import os

def test_image_alt_attributes():
    """
    Test that all images in trabajos/AgenteIA.html have a non-empty alt attribute.
    """
    file_path = "trabajos/AgenteIA.html"
    assert os.path.exists(file_path), f"File not found: {file_path}"

    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    images = soup.find_all("img")
    assert len(images) > 0, "No images found in the file"

    for img in images:
        src = img.get("src")
        alt = img.get("alt")

        # Check if alt attribute exists
        assert alt is not None, f"Image with src='{src}' is missing alt attribute"

        # Check if alt attribute is not empty (ignoring whitespace)
        assert alt.strip() != "", f"Image with src='{src}' has empty alt attribute"

    # Specific check for the image mentioned in the task
    target_img = soup.find("img", {"src": "imagenes/settings.png"})
    assert target_img is not None, "Target image 'imagenes/settings.png' not found"
    assert target_img.get("alt") == "Configuración de LM Studio y Continue", "Target image alt text mismatch"
