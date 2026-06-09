const API_BASE_URL = "http://localhost:8000";

export async function createSession() {
  const response = await fetch(
    `${API_BASE_URL}/sessions`,
    {
      method: "POST",
    }
  );

  return response.json();
}

export async function uploadPdf(
  sessionId: string,
  file: File
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await fetch(
      `${API_BASE_URL}/sessions/${sessionId}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

  return response.json();
}

export async function askQuestion(
  sessionId: string,
  question: string
) {
  const response =
    await fetch(
      `${API_BASE_URL}/sessions/${sessionId}/ask`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      }
    );

  return response.json();
}