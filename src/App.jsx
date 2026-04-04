import { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { fetchTransactions } from "./services/mockApi";

function AppShell() {
  const { state, dispatch } = useApp();

  const isDark = state.theme === "dark";

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTransactions();
        dispatch({ type: "SET_TRANSACTIONS", payload: data });
      } catch (e) {
        console.log("failed to load transactions", e);
      }
    };

    loadData();
  }, []);

  let content;

  if (state.activePage === "transactions") {
    content = <Transactions />;
  } else if (state.activePage === "insights") {
    content = <Insights />;
  } else {
    content = <Dashboard />;
  }

  return (
    <div className={isDark ? "bg-[#0b0e18] min-h-screen" : "bg-slate-50 min-h-screen"}>
      <Sidebar />

      <div className="lg:pl-64">
        <Topbar />

        <main className="pt-16">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {content}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}