import json
from src.llm.planner_chain import run_planner
from src.llm.critic_chain import run_critic
from src.tools.simulate_dsr import simulate_dsr
from src.tools.get_credit_policies import get_credit_policies
from .utils import mask_pii, data_minimize, unique_required_docs


def orchestrate_plans(input_payload: dict) -> dict:
    if not input_payload.get("user_consent", {}).get("personal_data"):
        raise ValueError("Consent required to proceed.")

    profile = input_payload["profile"]
    xai_case = input_payload["xai_case"]
    constraints = input_payload.get("constraints", {})

    ids = mask_pii(xai_case.get("application_id", "APP"), profile.get("customer_id", "CUST"))
    profile = {**profile, "customer_id": ids["cust"]}
    xai_case = {**xai_case, "application_id": ids["app"]}
    profile, xai_case = data_minimize(profile, xai_case)

    income = profile.get("income_net", 0) + (profile.get("co_applicant", {}).get("income_net") or 0)
    target_payment = constraints.get("target_monthly_payment", profile.get("debt_monthly", 0))
    dsr_ceiling = min(0.65, max(0.1, target_payment / max(income, 1)))

    policies = get_credit_policies({
        "income_net_min": profile.get("income_net", 0),
        "max_dsr_ceiling": dsr_ceiling,
        "region": profile.get("region", "TH-BKK"),
        "collateral_available": (profile.get("assets", {}) or {}).get("collateral_available", False),
        "employment_type": profile.get("employment_type", "unknown")
    }, limit=10)

    planner_input = {
        "profile": profile,
        "xai_case": xai_case,
        "retrieved_policies": policies,
        "constraints": constraints,
    }

    plans = run_planner(**planner_input)

    for plan in plans.get("plans", []):
        sim = simulate_dsr(
            income_net=profile.get("income_net", 0) + (profile.get("co_applicant", {}).get("income_net") or 0),
            debt_monthly=profile.get("debt_monthly", 0),
            actions=plan.get("actions", [])
        )
        for i, a in enumerate(plan.get("actions", [])):
            est = {
                "dsr_after": sim["scenarios"][i]["dsr_after"] if i < len(sim["scenarios"]) else a.get("estimated_effects", {}).get("dsr_after"),
                "monthly_payment_after": sim["scenarios"][i]["monthly_payment_after"] if i < len(sim["scenarios"]) else a.get("estimated_effects", {}).get("monthly_payment_after"),
            }
            a["estimated_effects"] = est

    critic = run_critic(plans, profile)
    retries = 0
    while not critic.get("passed") and retries < 2:
        hint = {"fixes": critic.get("suggested_fixes", []), "reasons": critic.get("reasons", [])}
        planner_input["constraints"] = {**constraints, "critic_hints": hint}
        plans = run_planner(**planner_input)
        critic = run_critic(plans, profile)
        retries += 1

    summary = {
        "required_docs": unique_required_docs(plans, policies)
    }

    return {"plans": plans, "critic": critic, "summary": summary}


