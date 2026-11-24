
import { useEffect, useState } from "react";
import { WidgetContextProvider } from "./context/WidgetContext";

import Widgets from "./components/Widget/Widget";
import Navigation from "./components/Navigation/Navigation";

import clsx from "clsx";
import "./App.css";

function App() {
  return (
    <WidgetContextProvider>
      <AppContent />
    </WidgetContextProvider>
  );
}

function AppContent() {
  const [navOpen, setNavOpen] = useState(false);
  const [timeoutValue, setTimeoutValue] = useState(30);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    console.log(timeoutValue);
  }, [timeoutValue]);

  return (
    <div className={clsx("app", !navOpen && "nav-closed")}>
      <Navigation
        open={navOpen}
        onToggle={() => setNavOpen((o) => !o)}
        timeoutValue={timeoutValue}
        onTimerChange={setTimeoutValue}
        onThemeToggle={toggleTheme}
      />

      <div className="main">
        <Widgets timeoutValue={timeoutValue} />
      </div>
    </div>
  );
}

export default App;
