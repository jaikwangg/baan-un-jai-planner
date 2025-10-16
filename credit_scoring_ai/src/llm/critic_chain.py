import json
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from .prompts_loader import load_prompt


def build_critic_chain(model_name: str = "gpt-4o-mini") -> LLMChain:
    prompt = PromptTemplate(
        input_variables=["plans", "profile"],
        template=load_prompt("configs/prompts/system_critic.txt") + "\nPlans: {plans}\nProfile: {profile}"
    )
    llm = ChatOpenAI(model_name=model_name, temperature=0.0)
    return LLMChain(llm=llm, prompt=prompt, output_key="critic_output")


def run_critic(plans_json: dict, profile: dict) -> dict:
    chain = build_critic_chain()
    raw = chain.run(plans=json.dumps(plans_json), profile=json.dumps(profile))
    try:
        return json.loads(raw)
    except Exception:
        return {"passed": False, "reasons": ["Invalid JSON"], "suggested_fixes": []}


