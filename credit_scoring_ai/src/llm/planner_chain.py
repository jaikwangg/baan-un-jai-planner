import json
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from .prompts_loader import load_prompt


def build_planner_chain(model_name: str = "gpt-4o-mini") -> LLMChain:
    prompt = PromptTemplate(
        input_variables=["profile", "xai_case", "retrieved_policies", "constraints"],
        template=load_prompt("configs/prompts/system_planner.txt")
    )
    llm = ChatOpenAI(model_name=model_name, temperature=0.2)
    return LLMChain(llm=llm, prompt=prompt, output_key="planner_output")


def run_planner(profile: dict, xai_case: dict, retrieved_policies: list, constraints: dict) -> dict:
    chain = build_planner_chain()
    raw = chain.run(
        profile=json.dumps(profile),
        xai_case=json.dumps(xai_case),
        retrieved_policies=json.dumps(retrieved_policies),
        constraints=json.dumps(constraints or {})
    )
    try:
        return json.loads(raw)
    except Exception:
        start = raw.find("{"); end = raw.rfind("}")
        return json.loads(raw[start:end+1])


