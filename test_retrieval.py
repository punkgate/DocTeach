from app.vector_store import search_documents

results = search_documents(
    "What backend technologies does Subrahmanya know?"
)

for i, result in enumerate(results):

    print("\n")
    print("=" * 60)
    print(f"RESULT {i + 1}")
    print("=" * 60)

    print(result.page_content)