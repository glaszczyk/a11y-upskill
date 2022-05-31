import classnames from 'classnames'
import styles from './Toast.module.scss'

type ToastPropTypes = {
  message: string
  type: 'success' | 'error'
}
export const Toast = ({ message, type }: ToastPropTypes) => {
  return (
    <p
      aria-live="polite"
      role="status"
      className={classnames(
        styles.toast,
        type === 'success' ? styles.success : styles.error
      )}
    >
      {message}
    </p>
  )
}
