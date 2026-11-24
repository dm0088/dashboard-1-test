
import { useEffect, useRef, useState, useContext } from "react";
import styles from "./Widget.module.css";
import Button from "../Button/Button";
import {
  Expand,
  Minimize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

import { WidgetContext } from "../../context/WidgetContext";

function Widget({
  id,
  url,
  expandedWidget,
  onExpand,
  onNext,
  onPrev,
  children,
}) {
  const expanded = expandedWidget === id;
  const hidden = expandedWidget !== null && !expanded;

  return (
    <div
      className={clsx(
        styles.widget,
        expanded && styles.expandedWidget,
        hidden && styles.hidden
      )}
    >
      <div className={styles.controlButtons}>
        {expanded && (
          <>
            <Button
              onClick={onPrev}
              icon={ChevronLeft}
              variant="primaryIcon"
              size="md"
              iconOnly
            />

            <Button
              onClick={onNext}
              icon={ChevronRight}
              variant="primaryIcon"
              size="md"
              iconOnly
            />
          </>
        )}

        <Button
          icon={expanded ? Minimize : Expand}
          variant="primaryIcon"
          size="md"
          iconOnly
          onClick={onExpand}
        />
      </div>

      <div className={styles.ifr}>
        <iframe src={url} frameBorder="0" title={String(children || id)} />
      </div>
    </div>
  );
}

function Widgets({ timeoutValue }) {
  const { widgetList } = useContext(WidgetContext);

  const [expandedWidget, setExpandedWidget] = useState(null);
  const [activity, setActivity] = useState(0);

  const timerRef = useRef(null);

  function toggleWidget(widgetId) {
    setExpandedWidget((prev) =>
      prev === widgetId ? null : widgetId
    );
  }

  function setNextWidget() {
    const currentIndex = widgetList.findIndex(
      (w) => w.id === expandedWidget
    );

    if (currentIndex === -1 || widgetList.length === 0) return;

    const nextIndex = (currentIndex + 1) % widgetList.length;
    setExpandedWidget(widgetList[nextIndex].id);
  }

  function setPrevWidget() {
    const currentIndex = widgetList.findIndex(
      (w) => w.id === expandedWidget
    );

    if (currentIndex === -1 || widgetList.length === 0) return;

    const prevIndex =
      (currentIndex - 1 + widgetList.length) % widgetList.length;

    setExpandedWidget(widgetList[prevIndex].id);
  }

  // Timer automatycznego zwijania widgetu
  useEffect(() => {
    clearTimeout(timerRef.current);

    if (expandedWidget === null) return;

    timerRef.current = setTimeout(() => {
      setExpandedWidget(null);
    }, timeoutValue * 1000);

    return () => clearTimeout(timerRef.current);
  }, [activity, expandedWidget, timeoutValue]);

  // Tryb debugowania
  const debug = true;

  return (
    <div
      className={styles.widgets}
      onClick={() => setActivity((prev) => prev + 1)}
    >
      {widgetList.map((widget) => (
        <Widget
          key={widget.id}
          id={widget.id}
          url={debug && widget.url}
          expandedWidget={expandedWidget}
          onExpand={() => toggleWidget(widget.id)}
          onNext={setNextWidget}
          onPrev={setPrevWidget}
        >
          {widget.name}
        </Widget>
      ))}
    </div>
  );
}

export default Widgets;
