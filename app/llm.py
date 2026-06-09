from langchain_ollama import OllamaLLM

llm = OllamaLLM(
    model="llama3"
)


def ask_llm(prompt):

    response = llm.invoke(prompt)

    return response

