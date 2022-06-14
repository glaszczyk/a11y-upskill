import { FormEvent } from 'react'

import styles from './TextArea.module.scss'

type InputPropTypes = {
  name: string
  label: string
  rows: number
  cols: number
  value: string
  onChange: (value: string) => void
  onBlur?: (value: string) => void
}
export const TextArea = ({
  rows,
  cols,
  onChange,
  onBlur,
  label,
  name,
  value,
}: InputPropTypes) => {
  const handleChange = (e: FormEvent<HTMLTextAreaElement>) =>
    onChange(e.currentTarget.value)

  const handleBlur = (e: FormEvent<HTMLTextAreaElement>) =>
    onBlur ? onBlur(e.currentTarget.value) : console.log()

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={styles.textarea}
        id={name}
        name={name}
        value={value}
        rows={rows}
        cols={cols}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  )
}
