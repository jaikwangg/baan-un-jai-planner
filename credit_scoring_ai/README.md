Credit Scoring RAG + Planner Orchestrator

Overview

This project scaffolds an English-first RAG + LLM + Chatbot pipeline for credit-planning and XAI explanation. It includes:
- Hybrid policy retrieval (BM25 + Vector DB)
- Planner LLM that proposes Plan A/B/C
- Tools: simulate DSR, get credit policies
- Critic LLM for compliance checks and auto-repair
- FastAPI endpoints for /plan and /chat

Quickstart

1) Python env
- python -m venv .venv
- .venv\\Scripts\\activate  (Windows) or source .venv/bin/activate (Unix)
- pip install -r requirements.txt

2) Environment
- Set OPENAI_API_KEY in your environment.

3) Run API
- uvicorn src.app:app --reload

Project Structure

credit_scoring_ai/
- configs/        # env, retriever configs, prompts
- data/           # policies, embeddings, cache
- src/            # application code (llm, retriever, tools, orchestrator, chatbot, agent)
- tests/          # basic tests

Notes

- Replace simulate_dsr with your finance engine.
- Adapt retriever adapters to your vector DB or Elastic.
- Prompts live under configs/prompts/ and can be localized per environment.


