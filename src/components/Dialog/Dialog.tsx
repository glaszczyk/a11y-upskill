import FocusLock from 'react-focus-lock'

import Close from '/public/Close.svg'
import { Button } from '../Button'

import styles from './Dialog.module.scss'
import Image from 'next/image'

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
            <Image
              src={Close}
              alt="Return to main page"
              width={44}
              height={44}
            />
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
