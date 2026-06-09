from app.pdf_processor import extract_text
from app.chunking import create_chunks
from app.vector_store import create_vector_store

text = extract_text(
    "uploads/Subrahmanya_Math_Resume.pdf"
)

chunks = create_chunks(text)

db = create_vector_store(chunks)

print("Stored Chunks:", len(chunks))