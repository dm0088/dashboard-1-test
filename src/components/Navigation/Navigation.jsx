
import styles from "./Navigation.module.css";
import stylesCommon from "./../commonStyles/common.module.css";
import clsx from "clsx";
import Button from "./../Button/Button";
import Input from "./../Input/Input";
import InputGroup from "../Input/InputGroup";
import { ToggleGroup } from "../Toggle/Toggle";
import Modal from "../Modal/Modal";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, Fragment, useContext } from "react";
import { WidgetContext } from "../../context/WidgetContext";

function Navigation({
  open,
  onToggle,
  timeoutValue,
  onTimerChange,
  onThemeToggle,
}) {
  const { widgetList, setWidgetList } = useContext(WidgetContext);

  const [timeoutInputValue, setTimeoutInputValue] = useState(String(timeoutValue));
  const [modalOpen, setmodalOpen] = useState(true);

  const [errors, setErrors] = useState({
    timeoutError: "",
    widgetNameError: "",
    configurationError: "",
  });

  const isError = Object.values(errors).some((error) => Boolean(error));

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

  function handleTimeoutChange(value) {
    setTimeoutInputValue(value);

    const error = validateTimeout(value);

    setErrors((prev) => ({
      ...prev,
      timeoutError: error,
    }));
  }

  function handleSave() {
    const timeoutError = validateTimeout(timeoutInputValue);

    setErrors((prev) => ({
      ...prev,
      timeoutError,
    }));

    if (isError || timeoutError) return;

    onTimerChange(Number(timeoutInputValue));
  }

  function ModalContent({ widgetList }) {
    const [editedWidget, setEditedWidget] = useState(widgetList);

    function handleChange(id, field, value) {
      const newEditedWidget = editedWidget.map((widget) =>
        widget.id === id ? { ...widget, [field]: value } : widget
      );

      setEditedWidget(newEditedWidget);
    }

    return (
      <>
        <div className={styles.widgetEditForm}>
          <p className={stylesCommon.label}>Widget name</p>
          <p className={stylesCommon.label}>Widget URL</p>

          {editedWidget.map((widget) => (
            <Fragment key={widget.id}>
              <Input
                value={widget.name}
                onChange={(e) =>
                  handleChange(widget.id, "name", e.target.value)
                }
              />

              <Input
                value={widget.url}
                onChange={(e) =>
                  handleChange(widget.id, "url", e.target.value)
                }
              />
            </Fragment>
          ))}
        </div>

        <Button
          onClick={() => setWidgetList(editedWidget)}
          className={styles.modalSaveButton}
        >
          Zapisz zmiany
        </Button>
      </>
    );
  }

  return (
    <>
      {modalOpen && (
        <Modal onModalClose={() => setmodalOpen(false)}>
          <ModalContent widgetList={widgetList} />
        </Modal>
      )}

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
            <ToggleGroup
              label="tryb"
              hint="light / dark"
              onToggle={onThemeToggle}
            />

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

            <Button onClick={() => setmodalOpen(true)}>
              Zmień raporty
            </Button>

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
    </>
  );
}

export default Navigation;
