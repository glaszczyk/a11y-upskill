import { FormEvent } from 'react'

import styles from './Input.module.scss'
import classnames from 'classnames'
import { FieldValue } from '../../layouts/IncidentReport/types'

type InputPropTypes = {
  name: string
  label: string
  type: 'text' | 'email' | 'date' | 'tel' | 'number'
  value: FieldValue<string | number>
  onChange: (value: string) => void
  onBlur?: (value: string) => void
  className?: string
  pattern?: string
  required?: boolean
}
export const Input = ({
  type = 'text',
  onChange,
  onBlur,
  label,
  name,
  value,
  className,
  pattern,
  required = false,
}: InputPropTypes) => {
  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value)

  const handleBlur = (e: FormEvent<HTMLInputElement>) =>
    onBlur ? onBlur(e.currentTarget.value) : console.log()

  const classNames = classnames(styles.input, className)
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required ? <span>*</span> : null}
      </label>
      <input
        className={classNames}
        id={name}
        name={name}
        type={type}
        value={value.value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby={`error-${name}`}
        aria-invalid={!!value.error}
        pattern={pattern}
        required={required}
      />
      <p className={styles.error} id={`error-${name}`}>
        {value.error ? value.error : null}
      </p>
    </div>
  )
}
