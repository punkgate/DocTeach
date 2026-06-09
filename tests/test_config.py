from app.config import (
    LLM_MODEL,
    EMBEDDING_MODEL,
    TOP_K_RESULTS
)


def test_llm_model_loaded():

    assert isinstance(
        LLM_MODEL,
        str
    )


def test_embedding_model_loaded():

    assert isinstance(
        EMBEDDING_MODEL,
        str
    )


def test_top_k_loaded():

    assert isinstance(
        TOP_K_RESULTS,
        int
    )

    assert TOP_K_RESULTS > 0