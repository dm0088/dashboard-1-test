import styles from "./Input.module.css";
import clsx from "clsx";

function Input({
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className,
  ...rest
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      {...rest}
    />
  );
}

export default Input;
