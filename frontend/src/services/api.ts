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