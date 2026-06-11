import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  createSession,
  uploadPdf,
  askQuestion,
} from "./services/api";

import type {
  TerminalLine,
} from "./types";

import Spinner from "./spinner";

import "./App.css";

const banner = `
██████╗  ██████╗  ██████╗████████╗███████╗ █████╗  ██████╗██╗  ██╗
██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔════╝██║  ██║
██║  ██║██║   ██║██║        ██║   █████╗  ███████║██║     ███████║
██║  ██║██║   ██║██║        ██║   ██╔══╝  ██╔══██║██║     ██╔══██║
██████╔╝╚██████╔╝╚██████╗   ██║   ███████╗██║  ██║╚██████╗██║  ██║
╚═════╝  ╚═════╝  ╚═════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`;

function App() {
  const [sessionId, setSessionId] =
    useState("");

  const [command, setCommand] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [loadingText,
    setLoadingText] =
    useState("");

  const [terminalLines,
    setTerminalLines] =
    useState<TerminalLine[]>([
      {
        type: "system",
        content:
          "Initializing DocTeach...",
      },
      {
        type: "success",
        content:
          "Retrieval Engine Loaded",
      },
      {
        type: "success",
        content:
          "Terminal Ready",
      },
      {
        type: "system",
        content:
          "Type 'help' to get started.",
      },
    ]);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const terminalRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      terminalRef.current
    ) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [
    terminalLines,
    isLoading,
  ]);

  function addLine(
    type: TerminalLine["type"],
    content: string
  ) {
    setTerminalLines(
      (prev) => [
        ...prev,
        {
          type,
          content,
        },
      ]
    );
  }

  async function runCommand(
    input: string
  ) {
    const cmd =
      input.trim();

    if (!cmd) return;

    addLine(
      "command",
      `> ${cmd}`
    );

    if (
      cmd === "help"
    ) {
      addLine(
        "system",
        "Available Commands:"
      );

      addLine(
        "system",
        "create-session"
      );

      addLine(
        "system",
        "upload"
      );

      addLine(
        "system",
        "about"
      );

      addLine(
        "system",
        "clear"
      );

      return;
    }

    if (
      cmd === "about"
    ) {
      addLine(
        "system",
        "DocTeach v0.6.1"
      );

      addLine(
        "system",
        "© 2026 Subrahmanya Anant Math"
      );

      addLine(
        "system",
        "GitHub: punkgate"
      );

      addLine(
        "system",
        "React + FastAPI + Ollama + ChromaDB"
      );

      return;
    }

    if (
      cmd === "clear"
    ) {
      setTerminalLines([]);

      return;
    }

    if (
      cmd ===
      "create-session"
    ) {
      setLoadingText(
        "Creating session..."
      );

      setIsLoading(
        true
      );

      try {
        const result =
          await createSession();

        setSessionId(
          result.session_id
        );

        addLine(
          "success",
          "Session created."
        );

        addLine(
          "system",
          `Session ID: ${result.session_id}`
        );
      } finally {
        setIsLoading(
          false
        );
      }

      return;
    }

    if (
      cmd === "upload"
    ) {
      if (
        !sessionId
      ) {
        addLine(
          "error",
          "Create a session first."
        );

        return;
      }

      fileInputRef.current?.click();

      return;
    }

    if (
      !sessionId
    ) {
      addLine(
        "error",
        "Create a session first."
      );

      return;
    }

    setLoadingText(
      "Thinking..."
    );

    setIsLoading(
      true
    );

    try {
      const result =
        await askQuestion(
          sessionId,
          cmd
        );

      addLine(
        "response",
        result.answer
      );
    } catch {
      addLine(
        "error",
        "Query failed."
      );
    } finally {
      setIsLoading(
        false
      );
    }
  }

  async function handleFileSelected(
    file: File
  ) {
    if (
      !sessionId
    )
      return;

    addLine(
      "system",
      `Selected: ${file.name}`
    );

    setLoadingText(
      `Uploading ${file.name}...`
    );

    setIsLoading(
      true
    );

    try {
      const result =
        await uploadPdf(
          sessionId,
          file
        );

      addLine(
        "success",
        `${file.name} uploaded.`
      );

      addLine(
        "system",
        `Indexed ${result.chunks_created} chunks.`
      );
    } catch {
      addLine(
        "error",
        "Upload failed."
      );
    } finally {
      setIsLoading(
        false
      );
    }
  }

  return (
    <div className="app">
      <div className="window">
        <div className="titlebar">
          DOC TEACH
        </div>

        <div className="content">
          <pre className="banner">
            {banner}
          </pre>

          <div
            className="terminal"
            ref={terminalRef}
          >
            {terminalLines.map(
              (
                line,
                index
              ) => (
                <div
                  key={index}
                  className={`line ${line.type}`}
                >
                  {
                    line.content
                  }
                </div>
              )
            )}

            {isLoading && (
              <div className="spinner">
                <Spinner
                  text={
                    loadingText
                  }
                />
              </div>
            )}

            <div className="line system">
              Quick Start:
              {" "}

              <span
                className="clickable-command"
                onClick={() =>
                  runCommand(
                    "create-session"
                  )
                }
              >
                create-session
              </span>

              {" • "}

              <span
                className="clickable-command"
                onClick={() =>
                  runCommand(
                    "upload"
                  )
                }
              >
                upload
              </span>

              {" • "}

              <span
                className="clickable-command"
                onClick={() =>
                  runCommand(
                    "about"
                  )
                }
              >
                about
              </span>

              {" • "}

              <span
                className="clickable-command"
                onClick={() =>
                  runCommand(
                    "help"
                  )
                }
              >
                help
              </span>
            </div>

            <div
              className="line system"
              style={{
                marginTop:
                  "30px",
                opacity: 0.6,
              }}
            >
              ────────────────────────────────────────
              <br />
              DocTeach v0.6.1
              <br />
              © 2026 Subrahmanya Anant Math
            </div>
          </div>

          <div className="command-input-container">
            <div className="command-prefix">
              &gt;
            </div>

            <input
              className="command-input"
              value={command}
              onChange={(e) =>
                setCommand(
                  e.target.value
                )
              }
              onKeyDown={async (
                e
              ) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  const current =
                    command;

                  setCommand(
                    ""
                  );

                  await runCommand(
                    current
                  );
                }
              }}
              autoFocus
            />
          </div>

          <input
            ref={
              fileInputRef
            }
            type="file"
            accept=".pdf"
            className="hidden-file-input"
            onChange={(
              e
            ) => {
              const file =
                e.target
                  .files?.[0];

              if (
                file
              ) {
                handleFileSelected(
                  file
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;