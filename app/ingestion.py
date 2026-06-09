from app.pdf_processor import extract_text
from app.chunking import create_chunks
from app.vector_store import add_chunks_to_db


def ingest_pdf(
    session_id,
    pdf_path
):
    """
    Complete ingestion pipeline.

    PDF
    ↓
    Text Extraction
    ↓
    Chunking
    ↓
    Vector Storage
    """

    text = extract_text(
        pdf_path
    )

    chunks = create_chunks(
        text
    )

    add_chunks_to_db(
        session_id,
        chunks
    )

    return {
        "chunks_created": len(chunks),
        "status": "success"
    }