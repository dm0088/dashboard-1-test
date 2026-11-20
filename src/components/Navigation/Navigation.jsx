
import styles from "./Navigation.module.css";
import clsx from "clsx";
import Button from "./../Button/Button";
import InputGroup from "../Input/InputGroup";
import { Toggle, ToggleGroup } from "../Toggle/Toggle"

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

function Navigation({ open, onToggle, timeoutValue, onTimerChange, widgetList }) {

  const [timeoutInputValue, setTimeoutInputValue] = useState(String(timeoutValue));

  // Wszystkie błędy walidacji w jednym miejscu
  const [errors, setErrors] = useState({
    timeoutError: "",
    widgetNameError: "",
    configurationError: "",
  });

  // Automatyczne sprawdzanie, czy występuje jakikolwiek błąd
  const isError = Object.values(errors).some(error => Boolean(error));

  // Walidacja czasu
  function validateTimeout(value) {
    if (value.trim() === "") {
      return "Pole jest wymagane";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "Podaj poprawną liczbę";
    }

    if (number < 3) {
      return "Minimalny czas to 3 sekundy";
    }

    if (!Number.isInteger(number)) {
      return "Podaj liczbę całkowitą";
    }

    return "";
  }

  // Obsługa zmiany czasu
  function handleTimeoutChange(value) {
    setTimeoutInputValue(value);

    const error = validateTimeout(value);

    setErrors(prev => ({
      ...prev,
      timeoutError: error,
    }));
  }

  // Zapis ustawień
  function handleSave() {
    const timeoutError = validateTimeout(timeoutInputValue);

    setErrors(prev => ({
      ...prev,
      timeoutError,
    }));

    if (isError || timeoutError) return;

    onTimerChange(Number(timeoutInputValue));
  }

  return (
    <div className={clsx(styles.nav, open && styles.open)}>
      <Button
        variant="primaryIcon"
        size="md"
        iconOnly
        icon={open ? ChevronsLeft : ChevronsRight}
        onClick={onToggle}
        style={{ border: "none" }}
      >
        {open ? "Zwiń menu" : "Rozwiń menu"}
      </Button>

      

      {open && (
        <div className={styles.navControls}>

          <ToggleGroup label="tryb" hint="light / dark"/>

          <InputGroup
            name="timeoutValue"
            label="Czas wyłączenia [s]"
            hint="Wprowadź czas w sekundach"
            type="number"
            min={3}
            step={1}
            value={timeoutInputValue}
            onChange={(e) => handleTimeoutChange(e.target.value)}
            errorText={errors.timeoutError}
          />

          <Button
            variant="primary"
            disabled={isError}
            onClick={handleSave}
          >
            Zapisz
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navigation;
