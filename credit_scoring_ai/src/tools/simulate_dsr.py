def simulate_dsr(income_net, debt_monthly, actions):
    income = max(1.0, float(income_net))
    baseline_payment = float(debt_monthly)
    baseline_dsr = round(baseline_payment / income, 3)
    scenarios = []
    for idx, a in enumerate(actions or []):
        pay = baseline_payment
        t = a.get("type")
        if t == "extend_tenor":
            pay *= 0.91
        if t == "debt_consolidation":
            pay *= 0.87
        if t == "reduce_loan_amount":
            pay *= 0.93
        if t == "increase_down_payment":
            pay *= 0.95
        dsr_after = round(pay / income, 3)
        scenarios.append({"action_idx": idx, "dsr_after": dsr_after, "monthly_payment_after": round(pay)})
    return {"baseline": {"dsr": baseline_dsr, "monthly_payment": baseline_payment}, "scenarios": scenarios, "notes": "approximation_only"}


