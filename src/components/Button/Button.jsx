import clsx from "clsx";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconOnly = false,
  disabled = false,
  onClick,
  type = "button",
  className,
  style,
}) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        className
      )}
      style={style}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly ? children : undefined}
    >
      {Icon && <Icon />}
      {!iconOnly && children}
    </button>
  );
}