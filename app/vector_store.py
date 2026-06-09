from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma

from app.session_manager import get_session_db_path

embedding_model = OllamaEmbeddings(
    model="nomic-embed-text"
)


def get_vector_store(session_id):

    db_path = get_session_db_path(
        session_id
    )

    return Chroma(
        persist_directory=db_path,
        embedding_function=embedding_model
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

    return embedding_model.embed_query(
        text
    )