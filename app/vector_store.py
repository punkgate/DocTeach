from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma

from app.config import EMBEDDING_MODEL
from app.session_manager import get_session_db_path

from app.config import (
    EMBEDDING_MODEL,
    OLLAMA_HOST
)

embeddings = OllamaEmbeddings(
    model=EMBEDDING_MODEL,
    base_url=OLLAMA_HOST
)


def get_vector_store(session_id):

    db_path = get_session_db_path(
        session_id
    )

    return Chroma(
        persist_directory=db_path,
        embedding_function=embeddings
    )


def add_chunks_to_db(
    session_id,
    chunks
):

    db = get_vector_store(
        session_id
    )

    db.add_texts(
        chunks
    )

    return db


def search_documents(
    session_id,
    question,
    k=3
):

    db = get_vector_store(
        session_id
    )

    results = db.similarity_search(
        query=question,
        k=k
    )

    return results


def embed_text(text):

    return embeddings.embed_query(
        text
    )