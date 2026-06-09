import { useState } from "react";

import {
  createSession,
  uploadPdf,
} from "./services/api";

function App() {
  const [sessionId, setSessionId] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  async function handleCreateSession() {
    const result =
      await createSession();

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

    try {
      const result =
        await uploadPdf(
          sessionId,
          file
        );

      console.log(result);

      alert(
        "PDF uploaded successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Upload failed."
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
    </div>
  );
}

export default App;