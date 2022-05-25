import { FormEvent } from 'react'

import styles from './Input.module.scss'

type InputPropTypes = {
  name: string
  label: string
  type: 'text' | 'email'
  value: string
  onChange: (value: string) => void
}
export const Input = ({
  type = 'text',
  onChange,
  label,
  name,
  value,
}: InputPropTypes) => {
  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

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
        onChange={handleChange}
      />
    </div>
  )
}
