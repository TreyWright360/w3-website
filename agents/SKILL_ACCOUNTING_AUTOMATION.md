# SKILL: Accounting & Finance Automation

## 1. Skill Overview
This skill focuses on transforming manual finance processes into automated workflows using Generative AI, specifically utilizing Custom GPTs, "Agent Mode" in Excel/ChatGPT, and Python Code Generation.

## 2. Core Automation Types

### A. Custom GPTs (The "Policy & Process" Bots)
*   **Best For:** Unstructured Q&A, Reference Checks, Lightweight Process Steps.
*   **Examples:**
    *   **Travel Policy Bot:** Upload T&E Policy PDF. Employees ask "Can I fly business class?" -> Bot gives policy-compliant answer.
    *   **Sales Tax Helper:** Upload Tax Nexus Guidelines. Ask "Do we have nexus in Ohio?" -> Bot references doc.
    *   **AP Coding Assistant:** Upload Chart of Accounts. Ask "How should I code this vendor?" -> Bot suggests GL account.
*   **Build Method:** ChatGPT > Explore GPTs > Create. Instructions: "You are a Controller. Answer only based on uploaded knowledge files."

### B. Agent Mode (The "Ad-Hoc Analyst")
*   **Best For:** One-off analysis, formatting data, creating initial drafts.
*   **Tools:** ChatGPT "Agent Mode" (Cross-app) or Excel Labs (In-Excel).
*   **Workflows:**
    *   **Excel Cleaning:** "Highlight all weekend transactions in yellow."
    *   **Flux Analysis Draft:** "Compare Tab A (Sept) vs Tab B (Aug) and write a variance explanation column."
    *   **Data Formatting:** "Turn this PDF invoice into a CSV table."

### C. Code Generation (The "Repeatable Robot")
*   **Best For:** High-volume, audit-trail required, repeatable monthly tasks (Month-End Close).
*   **Concept:** Use AI to *write the Python code*, not *do the math*. Code is deterministic (1+1=2 always). AI math is probabilistic (1+1=2 usually).
*   **Workflows:**
    *   **Revenue Recognition:** Python script that reads Invoice CSV -> Applies Rev Rec Logic (e.g., straight-line over 12 mo) -> Outputs Journal Entry CSV.
    *   **Reconciliations:** Script that matches Bank CSV to GL CSV based on Amount & Date.
*   **Prompt Strategy:** "You are a Python expert for Accountants. I will describe a manual process. Write a script to automate it. Do not write code yet, just confirm understanding."

## 3. Implementation Roadmap (The "Somya" Method)
1.  **Documentation:** Write down the manual process step-by-step (SOP).
2.  **Sandbox:** Anonymize data (remove PII/Customer Names).
3.  **Prototype:**
    *   *Low Complexity:* Build a Custom GPT.
    *   *High Complexity:* Ask ChatGPT to write a Python Script.
4.  **Validation:** Human review of the output (The "Preparer/Reviewer" model).
5.  **Deployment:** Move to production env (Enterprise Chatbot or Secure Script Runner).

## 4. Risks & Compliance
*   **Data Security:** Use Enterprise/Team plans to prevent model training. Use "Service Accounts" for API access.
*   **Hallucinations:** AI can make up numbers. **Solution:** Use Code Gen (Python) for math, use AI only for writing/logic.
*   **Shadow IT:** Ensure IT/SecOps approval for connecting AI to live ERPs (NetSuite, etc.).
