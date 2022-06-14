import { Button } from '../Button'
import FocusLock from 'react-focus-lock'

import styles from './Dialog.module.scss'
import { ReactNode } from 'react'

type DialogPropTypes = {
  onClose: () => void
  onSubmit: () => void
  children: ReactNode | ReactNode[]
}

export const Dialog = ({ onClose, onSubmit, children }: DialogPropTypes) => {
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
                Add
              </Button>
            </div>
          </div>
        </div>
      </>
    </FocusLock>
  )
}
