import fitz

def extract_text(pdf_path):

    document = fitz.open(pdf_path)

    full_text = ""

    for page in document:

        page_text = page.get_text()

        full_text += page_text

    return full_text