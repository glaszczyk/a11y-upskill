import { FormEvent } from 'react'

import styles from './RadioButton.module.scss'

type InputPropTypes = {
  groupName: string
  label: string
  value: string
  checked?: boolean
  onChange?: (e: FormEvent<HTMLInputElement>) => void
}
export const RadioButton = ({
  onChange,
  label,
  groupName,
  value,
  checked = false,
}: InputPropTypes) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        id={value}
        name={groupName}
        value={value}
        type="radio"
        checked={checked}
        onChange={onChange}
        tabIndex={checked ? 0 : -1}
        autoFocus={checked}
      />
      <label className={styles.label} htmlFor={value}>
        {label}
      </label>
    </div>
  )
}
