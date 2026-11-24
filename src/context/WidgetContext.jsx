import { createContext, useState } from "react";

const initialWidgets = [
  { name: "example", id: 1, url: "https://example.com/" },
  { name: "demoqua", id: 2, url: "https://demoqa.com/" },
  { name: "webdriver", id: 3, url: "https://webdriveruniversity.com/index.html" },
  { name: "widget 4", id: 4, url: "https://www.saucedemo.com/" },
];

export const WidgetContext = createContext();

export function WidgetContextProvider({ children }) {
  const [widgetList, setWidgetList] = useState(initialWidgets);

  return (
    <WidgetContext.Provider value={{ widgetList, setWidgetList }}>
      {children}
    </WidgetContext.Provider>
  );
}