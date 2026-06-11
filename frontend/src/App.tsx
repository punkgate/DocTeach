import { useState } from "react";

import {
  createSession,
  uploadPdf,
  askQuestion,
} from "./services/api";

import type {
  Message,
} from "./types";

function App() {
  const [sessionId, setSessionId] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

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
      await uploadPdf(
        sessionId,
        file
      );

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

  async function handleAsk() {
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
      const currentQuestion =
        question;

      const result =
        await askQuestion(
          sessionId,
          currentQuestion
        );

      setMessages(
        (prev) => [
          ...prev,
          {
            role: "user",
            content:
              currentQuestion,
          },
          {
            role:
              "assistant",
            content:
              result.answer,
          },
        ]
      );

      setQuestion("");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to get answer."
      );
    }
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily:
          "sans-serif",
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
          <strong>
            Active Session:
          </strong>{" "}
          {sessionId}
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
            marginLeft:
              "1rem",
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
          rows={4}
          cols={70}
        />

        <br />

        <button
          onClick={
            handleAsk
          }
          style={{
            marginTop:
              "1rem",
          }}
        >
          Ask
        </button>
      </div>

      <div
        style={{
          marginTop: "2rem",
        }}
      >
        <h2>
          Conversation
        </h2>

        {messages.map(
          (
            message,
            index
          ) => (
            <div
              key={index}
              style={{
                padding:
                  "1rem",
                marginBottom:
                  "1rem",
                border:
                  "1px solid #ddd",
                borderRadius:
                  "8px",
                backgroundColor:
                  message.role ===
                  "user"
                    ? "#f5f5f5"
                    : "#ffffff",
              }}
            >
              <strong>
                {message.role ===
                "user"
                  ? "You"
                  : "DocTeach"}
              </strong>

              <p>
                {
                  message.content
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;