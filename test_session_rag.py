from app.session_manager import create_session
from app.vector_store import add_chunks_to_db
from app.rag import answer_question

session_id = create_session()

add_chunks_to_db(
    session_id,
    [
        "FastAPI is a backend framework.",
        "Docker is used for containerization."
    ]
)

response = answer_question(
    session_id,
    "What backend technologies are used?"
)

print(response)