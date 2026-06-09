from fastapi import FastAPI

from app.session_manager import create_session

app = FastAPI()


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