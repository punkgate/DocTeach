from langchain_ollama import OllamaLLM

from app.config import LLM_MODEL

llm = OllamaLLM(
    model=LLM_MODEL
)


def ask_llm(prompt):

    response = llm.invoke(prompt)

    return response

