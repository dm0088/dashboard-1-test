import styles from "./Toggle.module.css";
import stylesGroup from "../commonStyles/controlGroup.module.css";
import clsx from "clsx";

export function Toggle({ size = "md", name , onToggle}) {
  return (
    <div>
      <label className={clsx(styles.switch, styles[size])}>
        <input
          type='checkbox'
          onChange={onToggle}
        />
        <span className={clsx(styles.slider, styles.round)}></span>
      </label>
    </div>
  );
}

export function ToggleGroup({ size = "md", label, name, hint, separation=true, onToggle}) {
  return (
    <div className={clsx(stylesGroup.controlGroup)}>
      {label && <label htmlFor={name}>{label}</label>}

      <Toggle
        onToggle={onToggle}
      />
          {hint && <span className={stylesGroup.hint}>{hint}</span>}
          
          {separation && <div className={ stylesGroup.separation }></div>}
    </div>
  );
}
