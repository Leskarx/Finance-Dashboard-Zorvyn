import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const STORAGE_KEY = "finDashState";

const initialState = {
  transactions: [],
  loading: true,
  role: "admin",
  theme: "dark",
  activePage: "dashboard",
  sidebarOpen: false,

  filters: {
    search: "",
    type: "All",
    category: "All",
    dateFrom: "",
    dateTo: "",
  },

  sort: { field: "date", dir: "desc" },
  page: 1,
  pageSize: 8,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    case "SET_PAGE":
      return {
        ...state,
        activePage: action.payload,
      };

    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.key]: action.value,
        },
        page: 1,
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: initialState.filters,
      };

    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
      };

    case "SET_PAGE_NO":
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
}

function getSavedState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return initialState;

    const parsed = JSON.parse(data);

    return {
      ...initialState,
      ...parsed,
      loading: false,
    };
  } catch (e) {
    console.log("error loading state");
    return initialState;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getSavedState);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        role: state.role,
        theme: state.theme,
        transactions: state.transactions,
      })
    );
  }, [state.role, state.theme, state.transactions]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}