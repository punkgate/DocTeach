from app.vector_store import embed_text

vector = embed_text(
    "FastAPI is a web framework"
)

print(type(vector))
print(len(vector))
print(vector[:10])