import { useState } from "react";

import {
  createSession,
  uploadPdf,
  askQuestion,
} from "./services/api";

function App() {
  const [sessionId, setSessionId] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  async function handleCreateSession() {
    const result =
      await createSession();

    console.log(
      "CREATED SESSION:",
      result.session_id
    );

    setSessionId(
      result.session_id
    );
  }

  async function handleUpload() {
    if (
      !sessionId ||
      !file
    ) {
      alert(
        "Create a session and select a PDF first."
      );
      return;
    }

    console.log(
      "UPLOAD SESSION:",
      sessionId
    );

    console.log(
      "FILE:",
      file.name
    );

    try {
      const result =
        await uploadPdf(
          sessionId,
          file
        );

      console.log(
        "UPLOAD RESPONSE:",
        result
      );

      alert(
        "PDF uploaded successfully."
      );
    } catch (error) {
      console.error(
        "UPLOAD ERROR:",
        error
      );

      alert(
        "Upload failed."
      );
    }
  }

  async function handleAsk() {

    console.log(
      "ASK SESSION:",
      sessionId
    );

    console.log(
      "QUESTION:",
      question
    );

    if (
      !sessionId ||
      !question
    ) {
      alert(
        "Create a session and enter a question."
      );
      return;
    }

    try {
      const result =
        await askQuestion(
          sessionId,
          question
        );

      console.log(
        "ASK RESPONSE:",
        result
      );

      setAnswer(
        result.answer
      );

    } catch (error) {

      console.error(
        "ASK ERROR:",
        error
      );

      alert(
        "Failed to get answer."
      );
    }
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1>DocTeach</h1>

      <button
        onClick={
          handleCreateSession
        }
      >
        Create Session
      </button>

      {sessionId && (
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <h2>
            Active Session
          </h2>

          <p>
            {sessionId}
          </p>
        </div>
      )}

      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {

            if (
              e.target.files
            ) {

              setFile(
                e.target
                  .files[0]
              );

            }

          }}
        />

        <button
          onClick={
            handleUpload
          }
          style={{
            marginLeft: "1rem",
          }}
        >
          Upload PDF
        </button>
      </div>

      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Ask a question..."
          rows={5}
          cols={60}
        />

        <br />

        <button
          onClick={handleAsk}
          style={{
            marginTop: "1rem",
          }}
        >
          Ask
        </button>
      </div>

      {answer && (
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <h2>
            Answer
          </h2>

          <p>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;