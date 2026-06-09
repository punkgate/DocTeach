from app.session_manager import create_session
from app.vector_store import add_chunks_to_db
from app.vector_store import search_documents

session_id = create_session()

print("Session:", session_id)

add_chunks_to_db(
    session_id,
    [
        "FastAPI is a Python backend framework.",
        "Docker is used for containerization."
    ]
)

results = search_documents(
    session_id,
    "backend technology"
)

for result in results:

    print()
    print(result.page_content)