from app.config import TOP_K_RESULTS
from app.vector_store import search_documents
from app.llm import ask_llm
from app.logger import logger


def answer_question(
    session_id: str,
    question: str
) -> str:

    logger.info(
        f"Question received: {question}"
    )

    results = search_documents(
        session_id=session_id,
        question=question,
        k=TOP_K_RESULTS
    )

    logger.info(
        f"Retrieved {len(results)} chunks"
    )

    if not results:

        logger.warning(
            "No relevant chunks found"
        )

        return (
            "I could not find that information "
            "in the documents."
        )

    context = "\n\n".join(
        [
            doc.page_content
            for doc in results
        ]
    )

    logger.info(
        f"Context length: {len(context)} characters"
    )

    prompt = f"""
You are an AI assistant.

Answer ONLY using the provided context.

If the answer is not present in the context, reply exactly:

"I could not find that information in the documents."

Context:
{context}

Question:
{question}

Answer:
"""

    logger.info(
        f"Prompt length: {len(prompt)} characters"
    )


    response = ask_llm(
        prompt
    )

    logger.info(
        "Generated response"
    )

    return response