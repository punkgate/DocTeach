from app.pdf_processor import extract_text
from app.chunking import create_chunks
from app.vector_store import add_chunks_to_db
from app.logger import logger


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

    logger.info(
        f"Starting ingestion for {pdf_path}"
    )

    text = extract_text(
        pdf_path
    )

    chunks = create_chunks(
        text
    )

    logger.info(
        f"Created {len(chunks)} chunks"
    )

    add_chunks_to_db(
        session_id,
        chunks
    )

    logger.info(
        "Stored chunks in vector database"
    )
    
    return {
        "chunks_created": len(chunks),
        "status": "success"
    }