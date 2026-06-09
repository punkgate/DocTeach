from dotenv import load_dotenv

import os

load_dotenv()

LLM_MODEL = os.getenv(
    "LLM_MODEL",
    "llama3"
)

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "nomic-embed-text"
)

TOP_K_RESULTS = int(
    os.getenv(
        "TOP_K_RESULTS",
        3
    )
)

LOG_LEVEL = os.getenv(
    "LOG_LEVEL",
    "INFO"
)

OLLAMA_HOST = os.getenv(
    "OLLAMA_HOST",
    "http://localhost:11434"
)