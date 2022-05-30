import { FormEvent, useState } from 'react'

import styles from './RadioGroup.module.scss'
import { RadioButtons } from '../../layouts/IncidentReport/types'
import { RadioButton } from '../RadioButton'

type InputPropTypes = {
  label: string
  groupName: string
  buttons: RadioButtons
  onChange: (value: string) => void
}

const getFirstSelectedRadioValue = (buttons: RadioButtons) =>
  buttons.filter((button) => button.checked)[0].value

export const RadioGroup = ({
  label,
  groupName,
  buttons,
  onChange,
}: InputPropTypes) => {
  const [selectedRadio, setSelectedRadio] = useState(
    getFirstSelectedRadioValue(buttons)
  )

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSelectedRadio(value)
    onChange(value)
  }

  return (
    <fieldset
      role="radiogroup"
      className={styles.groupWrapper}
      aria-labelledby={groupName}
    >
      <p id={groupName} className={styles.label}>
        {label}
      </p>
      {buttons.map((button, index) => (
        <RadioButton
          key={`radio-${index}`}
          groupName={groupName}
          label={button.label}
          value={button.value}
          checked={selectedRadio === button.value}
          onChange={handleChange}
        />
      ))}
    </fieldset>
  )
}
