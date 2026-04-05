import { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatINR, formatDate } from "../utils/format";
import AddTransactionModal from "../components/AddTransactionModal";

export default function Transactions() {
  const { state, dispatch } = useApp();

  const [showModal, setShowModal] = useState(false);

  let list = [...state.transactions];

  // search
  if (state.filters.search) {
    list = list.filter((t) =>
      t.description.toLowerCase().includes(state.filters.search.toLowerCase())
    );
  }

  // type filter
  if (state.filters.type !== "All") {
    list = list.filter((t) => t.type === state.filters.type);
  }

  // category
  if (state.filters.category !== "All") {
    list = list.filter((t) => t.category === state.filters.category);
  }

  // sorting
  list.sort((a, b) => {
    if (state.sort.field === "amount") {
      return state.sort.dir === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else {
      return state.sort.dir === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    }
  });

  const start = (state.page - 1) * state.pageSize;
  const paged = list.slice(start, start + state.pageSize);

  if (state.loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-4">
      {/* top bar */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="search..."
          value={state.filters.search}
          onChange={(e) =>
            dispatch({
              type: "SET_FILTER",
              key: "search",
              value: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        {state.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* table */}
      <table className="w-full text-sm border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Desc</th>
            <th className="p-2">Category</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            {state.role === "admin" && <th className="p-2">Action</th>}
          </tr>
        </thead>

        <tbody>
          {paged.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="p-2">{formatDate(t.date)}</td>
              <td className="p-2">{t.description}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">
                {t.type === "Income" ? "+" : "-"}
                {formatINR(t.amount)}
              </td>

              {state.role === "admin" && (
                <td className="p-2">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DELETE_TRANSACTION",
                        payload: t.id,
                      })
                    }
                    className="text-red-500"
                  >
                    delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() =>
            dispatch({
              type: "SET_PAGE_NO",
              payload: state.page - 1,
            })
          }
          disabled={state.page === 1}
        >
          Prev
        </button>

        <span>
          {state.page}
        </span>

        <button
          onClick={() =>
            dispatch({
              type: "SET_PAGE_NO",
              payload: state.page + 1,
            })
          }
        >
          Next
        </button>
      </div>

      {showModal && (
        <AddTransactionModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}