from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException
from app.models import QuestionRequest
from app.rag import answer_question
from app.logger import logger
from fastapi.middleware.cors import CORSMiddleware

import os

from app.session_manager import (
    create_session,
    get_session_documents_path
)

from app.ingestion import ingest_pdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("DOC TEACH STARTED")


@app.get("/")
def root():

    return {
        "message": "DocTeach API"
    }


@app.post("/sessions")
def create_new_session():

    session_id = create_session()

    return {
        "session_id": session_id
    }


@app.post("/sessions/{session_id}/upload")
async def upload_document(
    session_id: str,
    file: UploadFile = File(...)
):

    documents_path = get_session_documents_path(
        session_id
    )

    if not os.path.exists(
        documents_path
    ):
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )

    file_path = os.path.join(
        documents_path,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        content = await file.read()

        buffer.write(
            content
        )

    result = ingest_pdf(
        session_id,
        file_path
    )

    return {
        "filename": file.filename,
        "session_id": session_id,
        "chunks_created": result[
            "chunks_created"
        ]
    }

@app.post("/sessions/{session_id}/ask")
def ask_question(
    session_id: str,
    request: QuestionRequest
):

    response = answer_question(
        session_id,
        request.question
    )

    return {
        "session_id": session_id,
        "question": request.question,
        "answer": response
    }

