import { useApp } from "../context/AppContext";
import { formatINR } from "../utils/format";
import { balanceTrend } from "../data/mockData";

export default function Dashboard() {
  const { state } = useApp();

  const isDark = state.theme === "dark";

  let income = 0;
  let expense = 0;

  state.transactions.forEach((t) => {
    if (t.type === "Income") income += t.amount;
    else expense += t.amount;
  });

  const balance = income - expense;

  const recent = state.transactions.slice(0, 5);

  if (state.loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-4 space-y-5">
      {/* summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 border rounded">
          <p>Total Balance</p>
          <h2>{formatINR(balance)}</h2>
        </div>

        <div className="p-3 border rounded">
          <p>Income</p>
          <h2>{formatINR(income)}</h2>
        </div>

        <div className="p-3 border rounded">
          <p>Expense</p>
          <h2>{formatINR(expense)}</h2>
        </div>
      </div>

      {/* fake chart placeholder */}
      <div className="p-3 border rounded">
        <p className="mb-2">Balance Trend</p>
        <div className="text-sm text-gray-500">
          {/* quick chart idea */}
          {balanceTrend.map((d, i) => (
            <div key={i}>
              {d.month}: ₹{d.balance}
            </div>
          ))}
        </div>
      </div>

      {/* recent */}
      <div className="p-3 border rounded">
        <p className="mb-3">Recent Transactions</p>

        {recent.map((t) => (
          <div key={t.id} className="flex justify-between text-sm mb-2">
            <span>{t.description}</span>
            <span>
              {t.type === "Income" ? "+" : "-"}
              {formatINR(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}