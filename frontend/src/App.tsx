import { useState } from "react";
import { createSession } from "./services/api";

function App() {

  const [sessionId, setSessionId] =
    useState("");

  async function handleCreateSession() {

    const result =
      await createSession();

    setSessionId(
      result.session_id
    );
  }

  return (
    <div>

      <h1>DocTeach</h1>

      <button
        onClick={handleCreateSession}
      >
        Create Session
      </button>

      {sessionId && (

        <div>

          <h2>
            Active Session
          </h2>

          <p>
            {sessionId}
          </p>

        </div>

      )}

    </div>
  );
}

export default App;