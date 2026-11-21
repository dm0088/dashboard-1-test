
import stylesGroup from "../commonStyles/controlGroup.module.css";
import clsx from "clsx";
import Input from "./Input";

function InputGroup({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  hint,
  required = false,
  disabled = false,
  className,
  inputClassName,
  errorText,
  ...rest
}) {
  return (
    <div
      className={clsx(
        stylesGroup.controlGroup,
        className,
        errorText && stylesGroup.isError
      )}
    >
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className={stylesGroup.required}> *</span>}
        </label>
      )}

      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClassName}
        {...rest}
      />

      {errorText && (
        <span className={stylesGroup.errorLabel}>{errorText}</span>
      )}

      {hint && <span className={stylesGroup.hint}>{hint}</span>}
    </div>
  );
}

export default InputGroup;
