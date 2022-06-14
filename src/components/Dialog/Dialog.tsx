import { Button } from '../Button'
import FocusLock from 'react-focus-lock'

import styles from './Dialog.module.scss'

type DialogPropTypes = {
  onClose: () => void
  onSubmit: () => void
  children: JSX.Element | JSX.Element[]
  submitLabel?: string
}

export const Dialog = ({
  onClose,
  onSubmit,
  children,
  submitLabel = 'Add',
}: DialogPropTypes) => {
  return (
    <FocusLock>
      <>
        <div className={styles.modalBackground}></div>
        <div
          role="dialog"
          className={styles.dialog}
          aria-labelledby="dialog-title"
        >
          <Button className={styles.close} variant="icon" onClick={onClose}>
            x
          </Button>
          <div className={styles.content}>
            {children}
            <div className={styles.navigation}>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onSubmit}>
                {submitLabel}
              </Button>
            </div>
          </div>
        </div>
      </>
    </FocusLock>
  )
}
