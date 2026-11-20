import { useEffect, useState } from "react";
import "./App.css";

import Widgets from "./components/Widget/Widget";
import Navigation from "./components/Navigation/Navigation";

import clsx from "clsx";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [timeoutValue, setTimeoutValue] = useState(30);

  const [theme, setTheme] = useState("light");

  const [widgetList, setWidgetList] = useState([
    { name: "example", id: 1, url: "https://example.com/" },
    { name: "demoqua", id: 2, url: "https://demoqa.com/" },
    { name: "webdriver", id: 3, url: "https://webdriveruniversity.com/index.html" },
    { name: "widget 4", id: 4, url: "https://www.saucedemo.com/" },
  ]);

  // =================================
  // THEME
  // =================================

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => current === "light" ? "dark" : "light");
  };

  // =================================
  // TIMEOUT
  // =================================

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
        widgetList={widgetList}
        onWidgetListChange={setWidgetList}

        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <div className="main">
        <Widgets
          timeoutValue={timeoutValue}
          widgetList={widgetList}
        />
      </div>

    </div>
  );
}

export default App;