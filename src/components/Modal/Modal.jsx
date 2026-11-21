import styles from "./Modal.module.css"
import Button from "../Button/Button"
import { X } from 'lucide-react'

function Modal({ onModalClose , children}) {
    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>
                <div className={styles.modalTitle}>
                    <p>Modal title</p>
                    <Button
                        variant="primaryIconNoBg"
                        size="md"
                        className={styles.modalButtonClose}
                        iconOnly
                        icon={X}
                        onClick={onModalClose}
                    ></Button>
                </div>

                <div className={styles.modalContent}>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Modal