import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/format";

export default function Insights() {
  const { state } = useApp();

  const isDark = state.theme === "dark";

  let income = 0;
  let expense = 0;

  state.transactions.forEach((t) => {
    if (t.type === "Income") income += t.amount;
    else expense += t.amount;
  });

  const savings = income - expense;

  let topCategory = "";
  let max = 0;

  const map = {};

  state.transactions.forEach((t) => {
    if (t.type === "Expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;

      if (map[t.category] > max) {
        max = map[t.category];
        topCategory = t.category;
      }
    }
  });

  if (state.loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-4 space-y-5">
      <div className="p-3 border rounded">
        <p>Total Income</p>
        <h2>{formatINR(income)}</h2>
      </div>

      <div className="p-3 border rounded">
        <p>Total Expense</p>
        <h2>{formatINR(expense)}</h2>
      </div>

      <div className="p-3 border rounded">
        <p>Savings</p>
        <h2>{formatINR(savings)}</h2>
      </div>

      <div className="p-3 border rounded">
        <p>Top Category</p>
        <h2>{topCategory || "N/A"}</h2>
      </div>

      <div className="p-3 border rounded">
        <p>Transactions</p>

        {state.transactions.slice(0, 5).map((t) => (
          <div key={t.id} className="flex justify-between text-sm mb-2">
            <span>{t.category}</span>
            <span>{formatINR(t.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}