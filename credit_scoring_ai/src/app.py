import json
from fastapi import FastAPI, Body, HTTPException
from typing import Dict, Any
from src.agent.agent_executor import build_planning_agent, run_planning_agent
from src.orchestrator.plan_orchestrator import orchestrate_plans


app = FastAPI(title="Credit Scoring RAG Planner")
agent = build_planning_agent()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/plan")
def generate_plan(payload: Dict[str, Any] = Body(...)):
    try:
        profile = payload["profile"]
        xai_case = payload["xai_case"]
        constraints = payload.get("constraints", {})
        result = run_planning_agent(agent, profile, xai_case, constraints)
        return {"plans": result.get("plans", []), "auditable_context": result.get("auditable_context", {})}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/orchestrate")
def orchestrate(payload: Dict[str, Any] = Body(...)):
    try:
        out = orchestrate_plans(payload)
        return out
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.app:app", host="0.0.0.0", port=8000, reload=True)


