from app.session_manager import (
    create_session,
    get_session_db_path,
    get_session_documents_path
)


def test_create_session():

    session_id = create_session()

    assert isinstance(
        session_id,
        str
    )

    assert len(
        session_id
    ) == 8


def test_documents_path():

    session_id = "test1234"

    path = get_session_documents_path(
        session_id
    )

    assert path.endswith(
        "documents"
    )


def test_db_path():

    session_id = "test1234"

    path = get_session_db_path(
        session_id
    )

    assert path.endswith(
        "chroma_db"
    )