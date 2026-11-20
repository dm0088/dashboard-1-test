import { useEffect, useReducer, useRef, useState } from "react";
import styles from "./Widget.module.css";
import Button from "../Button/Button";
import { Expand, Minimize, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import clsx from "clsx";

function Widget({ id, url, expandedWidget, onExpand, onNext, onPrev, children }) {
  const expanded = expandedWidget === id;
  const hidden = expandedWidget !== null && !expanded;

  return (
    <div className={clsx(styles.widget, expanded && styles.expandedWidget, hidden && styles.hidden)}>
      <div className={styles.controlButtons}>

        {
          expanded &&
          <>
            <Button onClick={onPrev} icon={ChevronLeft} variant='primaryIcon' size='md' iconOnly></Button>
            <Button onClick={onNext} icon={ChevronRight} variant='primaryIcon' size='md' iconOnly></Button>
          </>
        }

        <Button
          icon={expanded ? Minimize : Expand}
          variant='primaryIcon'
          size='md'
          iconOnly
          onClick={onExpand}></Button>

      </div>
      <div className={styles.ifr}>
        <iframe src={ url } frameborder="0"></iframe>
      </div>
    </div>
  );
}

function Widgets({timeoutValue, widgetList}) {

  const [expandedWidget, setExpandedWidget] = useState(null);
  const [activity, setActivity] = useState(null)

  function toggleWidget(widgetId) {
    setExpandedWidget((prev) => (prev === widgetId ? null : widgetId));
  }

  function setNextWidget() {
    const currentIndex = widgetList.findIndex((w) => w.id === expandedWidget);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % widgetList.length;
    setExpandedWidget(widgetList[nextIndex].id);
  }

  function setPrevWidget(){
    const currentIndex = widgetList.findIndex((w) => w.id === expandedWidget);
    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + widgetList.length) % widgetList.length
    setExpandedWidget(widgetList[prevIndex].id)
  }


  const timerRef = useRef(null);

  function resetTimer() {
    clearTimeout(timerRef.current);
    if (expandedWidget === null) return;
    timerRef.current = setTimeout(() => {
      setExpandedWidget(null)
    }, timeoutValue * 1000 );
  }

  useEffect(() => {
    resetTimer();
    return()=>clearTimeout(timerRef.current)
  }, [activity])


  const debug = true

  return (
    <div className={styles.widgets} onClick={() => setActivity((prev) => prev + 1)}>

      {widgetList.map((widget) => (
        <Widget key={widget.id} id={widget.id} url={debug && widget.url} expandedWidget={expandedWidget} onExpand={() => toggleWidget(widget.id)} onNext={setNextWidget} onPrev={setPrevWidget} >
          {widget.name}
        </Widget>
      ))}
      
    </div>
  );
}

export default Widgets;
