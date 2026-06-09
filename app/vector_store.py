from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma

# Embedding model
embedding_model = OllamaEmbeddings(
    model="nomic-embed-text"
)


def embed_text(text):
    """
    Convert a piece of text into an embedding vector.
    Used mainly for testing and learning.
    """
    return embedding_model.embed_query(text)


def create_vector_store(chunks):
    """
    Create a ChromaDB vector database from text chunks.
    """

    vector_db = Chroma.from_texts(
        texts=chunks,
        embedding=embedding_model,
        persist_directory="./chroma_db"
    )

    return vector_db


def load_vector_store():
    """
    Load an existing ChromaDB database from disk.
    """

    return Chroma(
        persist_directory="./chroma_db",
        embedding_function=embedding_model
    )


def search_documents(question, k=3):
    """
    Search the vector database using semantic similarity.
    Returns the top k matching chunks.
    """

    db = load_vector_store()

    results = db.similarity_search(
        query=question,
        k=k
    )

    return results

print("VECTOR STORE LOADED")