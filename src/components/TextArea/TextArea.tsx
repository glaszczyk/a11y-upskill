import { FormEvent } from 'react'

import styles from './TextArea.module.scss'

type InputPropTypes = {
  name: string
  label: string
  rows: number
  cols: number
  value: string
  onChange: (e: FormEvent<HTMLTextAreaElement>) => void
}
export const TextArea = ({
  rows,
  cols,
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
      <textarea
        className={styles.textarea}
        name={name}
        value={value}
        rows={rows}
        cols={cols}
        onChange={onChange}
      />
    </div>
  )
}
