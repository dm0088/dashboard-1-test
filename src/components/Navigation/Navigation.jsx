import styles from "./Navigation.module.css";
import stylesCommon from "./../commonStyles/common.module.css"
import clsx from "clsx";
import Button from "./../Button/Button";
import Input from "./../Input/Input";
import InputGroup from "../Input/InputGroup";
import { Toggle, ToggleGroup } from "../Toggle/Toggle";
import Modal from "../Modal/Modal";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

function Navigation({ open, onToggle, timeoutValue, onTimerChange, widgetList, onThemeToggle, onWidgetListChange }) {
  const [timeoutInputValue, setTimeoutInputValue] = useState(String(timeoutValue));
  const [modalOpen, setmodalOpen] = useState(true);

  // Wszystkie błędy walidacji w jednym miejscu
  const [errors, setErrors] = useState({
    timeoutError: "",
    widgetNameError: "",
    configurationError: "",
  });

  // Automatyczne sprawdzanie, czy występuje jakikolwiek błąd
  const isError = Object.values(errors).some((error) => Boolean(error));

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

  // Obsługa zmiany czasu po zmianie wartosci input, za kazym razem jak sie wpisze nowa wartosc w pole
  function handleTimeoutChange(value) {
    //ustawiamy zeby zaktualizoqc pole nawet jak jest nieprawidlowa wartosc
    setTimeoutInputValue(value);

    //sprawdzamy czy wartosc wywala bledy
    const error = validateTimeout(value);

    //ustawiamy blad. tablica moze przecgowywyac bledy z innyc input i inntch elementow temu ma wiele elementoe - 1 tablica dla wielu bledow
    setErrors((prev) => ({
      ...prev,
      timeoutError: error,
    }));
  }

  // Zapis ustawień
  function handleSave() {
    const timeoutError = validateTimeout(timeoutInputValue);

    setErrors((prev) => ({
      ...prev,
      timeoutError,
    }));

    if (isError || timeoutError) return;

    onTimerChange(Number(timeoutInputValue));
  }

  function ModalContent({ widgetList, onWidgetListChange}) {
    const [editedWidget, setEditedWidget] = useState(widgetList)

    function handleChange(id, field, value) {
      const newEditedWidget = editedWidget.map((widget) => (
        widget.id === id ? {...widget, [field]:value} : widget
      ))
      setEditedWidget(newEditedWidget)
    }

    return (
      <>
      <div className={styles.widgetEditForm}>
        <p className={stylesCommon.label}>Widget name</p>
        <p className={stylesCommon.label}>Widget URL</p>
        {editedWidget.map((widget) => (
          <>
            <Input value={widget.name} onChange={(e)=>handleChange(widget.id, "name", e.target.value)}></Input>
            <Input value={widget.url} onChange={(e)=>handleChange(widget.id, "url", e.target.value)}></Input>
          </>
        ))}
      </div>
      <Button onClick={()=>onWidgetListChange(editedWidget)} className={styles.modalSaveButton}>zapisz zmiany</Button>
      </>
    );
  }

  return (
    <>
      {modalOpen && (
        <Modal onModalClose={() => setmodalOpen(false)}>
          <ModalContent widgetList={widgetList} onWidgetListChange={onWidgetListChange}  />
        </Modal>
      )}
      <div className={clsx(styles.nav, open && styles.open)}>
        <Button
          variant='primaryIcon'
          size='md'
          iconOnly
          icon={open ? ChevronsLeft : ChevronsRight}
          onClick={onToggle}
          style={{ border: "none" }}>
          {open ? "Zwiń menu" : "Rozwiń menu"}
        </Button>

        {open && (
          <div className={styles.navControls}>
            <ToggleGroup label='tryb' hint='light / dark' onToggle={onThemeToggle} />

            <InputGroup
              name='timeoutValue'
              label='Czas wyłączenia [s]'
              hint='Wprowadź czas w sekundach'
              type='number'
              min={3}
              step={1}
              value={timeoutInputValue}
              //jak sie zmieni to wywoła sie funkcja i przekaze wartosc input
              onChange={(e) => handleTimeoutChange(e.target.value)}
              errorText={errors.timeoutError}
            />

            <Button onClick={() => setmodalOpen(true)}>Zmień raporty</Button>

            <Button variant='primary' disabled={isError} onClick={handleSave}>
              Zapisz
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navigation;
