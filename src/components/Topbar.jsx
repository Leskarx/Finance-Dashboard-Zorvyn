import { Menu, Sun, Moon, Download } from "lucide-react";
import { useApp } from "../context/AppContext";
import { exportToCSV, exportToJSON } from "../utils/format";

export default function Topbar() {
  const { state, dispatch } = useApp();

  const isDark = state.theme === "dark";

  let title = "Dashboard";
  if (state.activePage === "transactions") title = "Transactions";
  if (state.activePage === "insights") title = "Insights";

  return (
    <header
      className={`fixed top-0 left-0 right-0 lg:left-64 z-10 h-16 flex items-center px-4 md:px-6 gap-4 border-b ${
        isDark ? "bg-[#0b0e18] border-[#1e2130]" : "bg-white border-slate-200"
      }`}
    >
      {/* menu btn */}
      <button
        className={`lg:hidden p-2 rounded-lg ${
          isDark
            ? "text-slate-400 hover:bg-white/5"
            : "text-slate-500 hover:bg-slate-100"
        }`}
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1
        className={`text-lg font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2">
        {state.activePage === "transactions" && (
          <div className="relative group">
            <button
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border ${
                isDark
                  ? "border-[#1e2130] text-slate-300"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>

            <div
              className={`absolute right-0 mt-1 w-36 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 ${
                isDark ? "bg-[#13161f]" : "bg-white"
              }`}
            >
              <button
                onClick={() => exportToCSV(state.transactions)}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
              >
                CSV
              </button>
              <button
                onClick={() => exportToJSON(state.transactions)}
                className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-100"
              >
                JSON
              </button>
            </div>
          </div>
        )}

        {/* role */}
        <select
          value={state.role}
          onChange={(e) =>
            dispatch({ type: "SET_ROLE", payload: e.target.value })
          }
          className="text-xs px-2 py-1 rounded border"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* theme */}
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className="p-2 rounded border"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}