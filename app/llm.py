from langchain_ollama import OllamaLLM

from app.config import LLM_MODEL
from app.logger import logger


# Create the model once when the application starts
llm = OllamaLLM(
    model=LLM_MODEL
)

logger.info(
    f"Initialized LLM: {LLM_MODEL}"
)


def ask_llm(prompt: str) -> str:
    """
    Send a prompt to the LLM and return the response.
    """

    logger.info(
        f"Sending prompt to {LLM_MODEL}"
    )

    try:

        response = llm.invoke(
            prompt
        )

        logger.info(
            "Generated LLM response"
        )

        return response

    except Exception as e:

        logger.exception(
            f"LLM invocation failed: {e}"
        )

        raise