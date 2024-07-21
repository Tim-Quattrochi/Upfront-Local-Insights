import {
  createContext,
  useReducer,
  useContext,
  useEffect,
} from "react";

const initialThemeState = {
  theme: "light",
};

const ThemeContext = createContext(initialThemeState);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    themeReducer,
    initialThemeState
  );

  const handleThemeChange = () => {
    const newTheme = state.theme === "light" ? "dark" : "light";
    localStorage.setItem("insights-theme", newTheme);
    dispatch({ type: "SET_THEME", payload: newTheme });
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", state.theme);
    localStorage.setItem("insights-theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("insights-theme");
    if (savedTheme && savedTheme !== state.theme) {
      dispatch({ type: "SET_THEME", payload: savedTheme });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
