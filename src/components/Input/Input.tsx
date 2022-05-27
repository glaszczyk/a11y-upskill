import { FormEvent } from 'react'

import styles from './Input.module.scss'
import classnames from 'classnames'

type InputPropTypes = {
  name: string
  label: string
  type: 'text' | 'email' | 'date'
  value: string
  onChange: (value: string) => void
  className?: string
}
export const Input = ({
  type = 'text',
  onChange,
  label,
  name,
  value,
  className,
}: InputPropTypes) => {
  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  const classNames = classnames(styles.input, className)
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={classNames}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
