from app.config import TOP_K_RESULTS
from app.vector_store import search_documents
from app.llm import ask_llm
from app.logger import logger

def answer_question(
    session_id,
    question
):
    logger.info(
        f"Question received: {question}"
    )

    results = search_documents(
        session_id,
        question,
        k=TOP_K_RESULTS
    )

    logger.info(
        f"Retrieved {len(results)} chunks"
    )

    context = "\n\n".join(
        [
            doc.page_content
            for doc in results
        ]
    )

    prompt = f"""
You are an AI assistant.

Use ONLY the provided context to answer the question.

If the answer is not present in the context, say:

"I could not find that information in the documents."

Context:
{context}

Question:
{question}

Answer:
"""

    response = ask_llm(
        prompt
    )

    logger.info(
        "Generated response"
    )

    return response