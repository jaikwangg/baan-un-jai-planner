import random

def get_ai_response(text: str) -> str:
    """
    Simulates a call to an AI service with predefined financial advice.
    """
    financial_advice = [
        "Remember to always pay yourself first. Automate a transfer to your savings account on payday.",
        "Diversifying your investments is key to managing risk. Don't put all your eggs in one basket.",
        "Creating a budget is the first step to financial freedom. Track your income and expenses.",
        "High-interest debt can be a major obstacle. Prioritize paying off credit cards and personal loans.",
        "Consider a mix of stocks and bonds in your portfolio. The right allocation depends on your risk tolerance and time horizon.",
        "An emergency fund is crucial. Aim to have 3-6 months of living expenses saved in an easily accessible account.",
        "Start investing as early as possible to take advantage of compound interest.",
        "Review your investment portfolio at least once a year to ensure it's still aligned with your goals.",
    ]

    # You can add more sophisticated logic here to select a response based on the input text.
    # For now, we'll just return a random piece of advice.
    return random.choice(financial_advice)
