def mask_pii(app_id: str, cust_id: str):
    return {"app": f"APP-{app_id[-6:]}", "cust": f"CUST-{cust_id[-6:]}"}


def data_minimize(profile: dict, xai: dict):
    return profile, xai


def unique_required_docs(plans: dict, policies: list) -> list:
    refs = set()
    for p in plans.get("plans", []):
        for r in p.get("policy_references", []):
            refs.add(r)
    docset = set()
    for pol in policies:
        if pol.get("policy_id") in refs:
            for d in pol.get("required_docs", []):
                docset.add(d)
    return list(docset)


