import uuid
import os


SESSIONS_DIR = "sessions"


def create_session():

    session_id = str(uuid.uuid4())[:8]

    session_path = os.path.join(
        SESSIONS_DIR,
        session_id
    )

    os.makedirs(
        session_path,
        exist_ok=True
    )

    return session_id


def get_session_db_path(session_id):

    return os.path.join(
        SESSIONS_DIR,
        session_id,
        "chroma_db"
    )