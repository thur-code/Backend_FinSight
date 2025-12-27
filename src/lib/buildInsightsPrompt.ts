type Transaction = {
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
};

interface BuildPromptInput {
  income: number;
  expense: number;
  balance: number;
  transactions: Transaction[];
}

export function buildInsightsPrompt(data: BuildPromptInput) {
  return `
You are a financial analysis engine.

Rules:
- Respond ONLY with valid JSON
- Follow exactly this format:
{
  "insights": [
    { "type": "warning | info | positive", "message": "string" }
  ]
}
- No explanations
- No markdown
- No extra text
- Please answer in Brazilian Portuguese
- Use the Real as currency

User financial data:
Income: ${data.income}
Expense: ${data.expense}
Balance: ${data.balance}

Transactions:
${JSON.stringify(data.transactions)}

Generate concise and objective financial insights.
`;
}
