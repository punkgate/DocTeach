from app.pdf_processor import extract_text

text = extract_text(
    "uploads/Subrahmanya_Math_Resume.pdf"
)

print(text[:2000])