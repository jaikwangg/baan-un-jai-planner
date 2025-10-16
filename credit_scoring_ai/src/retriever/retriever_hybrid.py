import os
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.retrievers import BM25Retriever


def build_hybrid_retriever():
    emb = OpenAIEmbeddings(model="text-embedding-3-small")
    vectordb = None
    try:
        vectordb = FAISS.load_local("data/embeddings/faiss_index", emb, allow_dangerous_deserialization=True)
        vector_retriever = vectordb.as_retriever(search_kwargs={"k": 10})
    except Exception:
        vector_retriever = None

    policy_files = [f for f in os.listdir("data/policies") if f.endswith(".txt")]
    texts = [open(os.path.join("data/policies", f), "r", encoding="utf-8").read() for f in policy_files]
    bm25 = BM25Retriever.from_texts(texts=texts, metadatas=[{"source": f} for f in policy_files])

    def hybrid_get_relevant_documents(query):
        dense_docs = vector_retriever.get_relevant_documents(query) if vector_retriever else []
        sparse_docs = bm25.get_relevant_documents(query)
        uniq = {}
        for d in dense_docs + sparse_docs:
            key = d.metadata.get("source", str(hash(d.page_content)) )
            if key not in uniq:
                uniq[key] = d
        return list(uniq.values())

    return hybrid_get_relevant_documents


