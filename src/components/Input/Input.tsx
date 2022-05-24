import { FormEvent } from 'react'

import styles from './Input.module.scss'

type InputPropTypes = {
  name: string
  label: string
  type: 'text' | 'email'
  value: string
  onChange: (e: FormEvent<HTMLInputElement>) => void
}
export const Input = ({
  type = 'text',
  onChange,
  label,
  name,
  value,
}: InputPropTypes) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
