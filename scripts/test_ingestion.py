from app.session_manager import create_session
from app.ingestion import ingest_pdf
from app.rag import answer_question

session_id = create_session()

print("Session:", session_id)

result = ingest_pdf(
    session_id,
    "uploads/Subrahmanya_Math_Resume.pdf"
)

print(result)

response = answer_question(
    session_id,
    "What backend technologies does Subrahmanya know?"
)

print()
print(response)