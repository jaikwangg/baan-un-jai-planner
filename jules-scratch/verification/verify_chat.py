from playwright.sync_api import sync_playwright, Page, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        try:
            page = browser.new_page()

            print("Navigating to chat page...")
            page.goto("http://localhost:5173/baan-un-jai-planner/chat")

            print("Waiting for page to load...")
            expect(page.get_by_text("Finance Chatbot")).to_be_visible()

            print("Typing message...")
            page.get_by_placeholder("Ask about finance...").fill("What's a good way to save money?")

            print("Clicking send...")
            page.get_by_role("button", name="Send").click()

            print("Waiting for bot response...")
            expect(page.locator(".bg-gray-200")).to_be_visible()

            print("Taking screenshot...")
            page.screenshot(path="/tmp/chat_verification.png") # Save to /tmp
            print("Screenshot saved to /tmp.")

        finally:
            browser.close()

if __name__ == "__main__":
    run()
