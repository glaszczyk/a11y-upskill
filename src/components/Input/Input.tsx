import { useContext } from 'react'

import styles from './Input.module.scss'

import { IncidentReportContext } from '../../layouts/IncidentReport'
import { ReportAction } from '../../layouts/IncidentReport/types'

type InputPropTypes = {
  name: string
  label: string
  type: 'text' | 'email'
  value: string
  dispatchType: ReportAction
}
export const Input = ({
  type = 'text',
  dispatchType,
  label,
  name,
  value,
}: InputPropTypes) => {
  const { dispatch } = useContext(IncidentReportContext)

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={(e) =>
          dispatch({ type: dispatchType, payload: e.currentTarget.value })
        }
      />
    </div>
  )
}
