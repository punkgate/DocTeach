# scripts/test_rag.py

from app.rag import answer_question

response = answer_question(
    session_id="YOUR_SESSION_ID",
    question="What backend technologies does Anant know?"
)

print(response)