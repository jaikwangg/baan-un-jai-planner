import os


def ensure_dirs():
    os.makedirs("data/embeddings", exist_ok=True)
    os.makedirs("data/policies", exist_ok=True)


