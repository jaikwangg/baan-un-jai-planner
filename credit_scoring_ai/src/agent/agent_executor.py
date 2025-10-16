import json
from langchain.chat_models import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from typing import Dict, Any


SYSTEM_PLANNER = (
    "You are a credit-advisory AI for a financial institution. "
    "Generate at least three compliant plans (A/B/C) using retrieved policies and XAI. "
    "Link to policies, ensure DSR/min_income/LTV/tenor compliance. "
    "Output strictly as JSON with fields: plans[], auditable_context. "
    "If any value is unknown, set null and provide reasons_for_null where applicable."
)

PROMPT = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PLANNER),
    MessagesPlaceholder(variable_name="chat_history"),
    ("user", """Context JSON:\n- profile: {profile}\n- xai_case: {xai_case}\n- constraints: {constraints}\nTask: Propose Plan A/B/C in JSON (Plan Schema)."""),
])


def build_planning_agent(model_name: str = "gpt-4o-mini") -> AgentExecutor:
    from src.tools.get_credit_policies import get_credit_policies
    from src.tools.simulate_dsr import simulate_dsr
    # Wrap python callables as tools via OpenAI function-call style proxy
    def tool_get_policies(input: Dict[str, Any]) -> str:
        return json.dumps(get_credit_policies(input, limit=input.get("limit", 10)))

    def tool_sim_dsr(input: Dict[str, Any]) -> str:
        res = simulate_dsr(input.get("income_net", 0), input.get("debt_monthly", 0), input.get("actions", []))
        return json.dumps(res)

    # Minimal tool specs for create_openai_tools_agent
    tools = [
        {
            "name": "get_credit_policies",
            "description": "Retrieve credit policies/products compatible with applicant constraints",
            "func": tool_get_policies,
            "args_schema": None,
        },
        {
            "name": "simulate_dsr",
            "description": "Estimate new DSR and monthly payment after applying actions (approximate)",
            "func": tool_sim_dsr,
            "args_schema": None,
        },
    ]

    llm = ChatOpenAI(model_name=model_name, temperature=0.2)
    agent = create_openai_tools_agent(llm=llm, tools=tools, prompt=PROMPT)
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    executor = AgentExecutor(agent=agent, tools=tools, verbose=False, memory=memory, handle_parsing_errors=True)
    return executor


def run_planning_agent(executor: AgentExecutor, profile: Dict[str, Any], xai_case: Dict[str, Any], constraints: Dict[str, Any]) -> Dict[str, Any]:
    resp = executor.invoke({
        "profile": json.dumps(profile, ensure_ascii=False),
        "xai_case": json.dumps(xai_case, ensure_ascii=False),
        "constraints": json.dumps(constraints or {}, ensure_ascii=False),
    })
    text = resp.get("output", "{}")
    try:
        return json.loads(text)
    except Exception:
        start = text.find("{"); end = text.rfind("}")
        return json.loads(text[start:end+1])


