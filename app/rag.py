from app.vector_store import search_documents
from app.llm import ask_llm


def answer_question(question):

    results = search_documents(
        question,
        k=3
    )

    context = "\n\n".join(
        [doc.page_content for doc in results]
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

    response = ask_llm(prompt)

    return response