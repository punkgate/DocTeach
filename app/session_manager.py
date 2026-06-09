import uuid
import os


SESSIONS_DIR = "sessions"


def create_session():

    session_id = str(uuid.uuid4())[:8]

    session_path = os.path.join(
        SESSIONS_DIR,
        session_id
    )

    documents_path = os.path.join(
        session_path,
        "documents"
    )

    os.makedirs(
        documents_path,
        exist_ok=True
    )

    return session_id


def get_session_db_path(session_id):

    return os.path.join(
        SESSIONS_DIR,
        session_id,
        "chroma_db"
    )

def get_session_documents_path(
    session_id
):

    return os.path.join(
        SESSIONS_DIR,
        session_id,
        "documents"
    )