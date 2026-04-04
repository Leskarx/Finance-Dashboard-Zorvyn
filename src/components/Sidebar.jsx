import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  X,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const { state, dispatch } = useApp();

  const isDark = state.theme === "dark";

  const goTo = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
    dispatch({ type: "TOGGLE_SIDEBAR" }); // quick close on mobile
  };

  return (
    <>
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 z-30 flex flex-col ${
          isDark ? "bg-[#0f1117]" : "bg-white"
        } ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* logo */}
        <div className="flex items-center gap-2 px-5 py-4 border-b">
          <div className="w-7 h-7 bg-green-500 rounded flex items-center justify-center">
            <TrendingUp size={14} color="#fff" />
          </div>

          <span className="font-semibold">FinTrack</span>

          <button
            className="ml-auto lg:hidden"
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 px-3 py-4">
          <button
            onClick={() => goTo("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded ${
              state.activePage === "dashboard" ? "bg-green-100" : ""
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => goTo("transactions")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded ${
              state.activePage === "transactions" ? "bg-green-100" : ""
            }`}
          >
            <ArrowLeftRight size={18} />
            Transactions
          </button>

          <button
            onClick={() => goTo("insights")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded ${
              state.activePage === "insights" ? "bg-green-100" : ""
            }`}
          >
            <Lightbulb size={18} />
            Insights
          </button>
        </div>

        <div className="px-4 py-3 text-xs text-gray-400 border-t">
          © 2026
        </div>
      </aside>
    </>
  );
}