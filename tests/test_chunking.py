from app.chunking import create_chunks


def test_chunking_returns_chunks():

    text = "Hello world. " * 500

    chunks = create_chunks(
        text
    )

    assert len(chunks) > 0