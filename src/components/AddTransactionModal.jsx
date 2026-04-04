import { useState } from "react";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { categories } from "../data/mockData";

export default function AddTransactionModal({ onClose }) {
  const { state, dispatch } = useApp();

  const isDark = state.theme === "dark";

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "Expense",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.description) {
      setError("enter description");
      return;
    }

    const amt = Number(form.amount);
    if (!amt || amt <= 0) {
      setError("invalid amount");
      return;
    }

    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        id: Date.now(),
        ...form,
        amount: amt,
      },
    });

    onClose();
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const filteredCategories =
    form.type === "Income"
      ? ["Salary", "Freelance", "Investment"]
      : categories.filter((c) => c !== "All");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`w-full max-w-md p-5 rounded ${
          isDark ? "bg-[#13161f]" : "bg-white"
        }`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Add Transaction</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="text-sm">Type</label>
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => handleChange("type", "Expense")}
                className={`px-3 py-1 rounded ${
                  form.type === "Expense" ? "bg-red-400 text-white" : ""
                }`}
              >
                Expense
              </button>

              <button
                type="button"
                onClick={() => handleChange("type", "Income")}
                className={`px-3 py-1 rounded ${
                  form.type === "Income" ? "bg-green-500 text-white" : ""
                }`}
              >
                Income
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="number"
            placeholder="amount"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />

          <div className="flex gap-2 mb-3">
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-1/2 p-2 border rounded"
            >
              {filteredCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 p-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 p-2 bg-green-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}