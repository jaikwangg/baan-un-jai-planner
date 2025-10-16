from typing import Dict, Any, List
from src.retriever.retriever_hybrid import build_hybrid_retriever


def get_credit_policies(filters: Dict[str, Any], limit: int = 10) -> List[Dict[str, Any]]:
    retriever = build_hybrid_retriever()
    region = filters.get("region", "TH-BKK")
    income = filters.get("income_net_min", 0)
    max_dsr = filters.get("max_dsr_ceiling", 0.5)
    employment = filters.get("employment_type", "unknown")
    collateral = "yes" if filters.get("collateral_available", False) else "no"
    query = f"credit policy; min_income <= {income}; max_dsr >= {max_dsr}; region={region}; employment={employment}; collateral={collateral}"
    docs = retriever(query)
    items = []
    for d in docs[:limit]:
        md = dict(d.metadata or {})
        items.append({
            "policy_id": md.get("policy_id", md.get("source", "UNKNOWN")),
            "product_type": md.get("product_type", "unknown"),
            "eligibility_rules": md.get("eligibility_rules", {}),
            "pricing": md.get("pricing", {}),
            "required_docs": md.get("required_docs", []),
            "text_chunk": d.page_content,
            "citations": md.get("citations", []),
        })
    return items


