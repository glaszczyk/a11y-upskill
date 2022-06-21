import { useContext, useEffect, useState } from 'react'

import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { TextArea } from '../../../../components/TextArea'
import {
  IncidentDetailsAction,
  RadioButtons,
  FieldValue,
  IncidentDetailsKeys,
  IncidentDetails,
} from '../../types'
import { Input } from '../../../../components/Input'
import { RadioGroup } from '../../../../components/RadioGroup'

import styles from './IncidentDetailsScreen.module.scss'
import { dateValidation, textWithSpacesValidation } from '../../validators'

type PersonalDetailsScreenPropTypes = {
  currentStep: StepConfigItem
}

export const IncidentDetailsScreen = ({
  currentStep,
}: PersonalDetailsScreenPropTypes) => {
  const {
    state: { incidentDetails },
    dispatch,
  } = useContext(IncidentReportContext)

  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState('')

  const requiredFieldsFilled = (fields: IncidentDetails) =>
    (Object.keys(fields) as (keyof typeof fields)[]).forEach((element) => {
      if (fields[element].required && !Boolean(fields[element].value))
        dispatch({
          type: 'setRequiredIncidentDetailsEmpty',
          payload: fields[element],
        })
    })

  const getFieldsErrors = (fields: IncidentDetails) =>
    (Object.keys(fields) as (keyof typeof fields)[]).reduce((acc, current) => {
      const isValidField = fields[current].required
        ? fields[current].required &&
          Boolean(fields[current].value) &&
          !Boolean(fields[current].error)
        : true

      return isValidField ? [...acc] : [...acc, current]
    }, [] as (keyof typeof fields)[])

  const handleChangeDispatch =
    (
      actionName: IncidentDetailsAction,
      currentValue: FieldValue<IncidentDetailsKeys, string | number>
    ) =>
    (value: string) =>
      dispatch({
        type: actionName,
        payload: { ...currentValue, value },
      })

  const handleBlurDispatch =
    (
      actionName: IncidentDetailsAction,
      callback: (value: string) => string,
      currentValue: FieldValue<IncidentDetailsKeys, string | number>
    ) =>
    (value: string) => {
      const error = callback(value)
      dispatch({
        type: actionName,
        payload: { ...currentValue, error },
      })
    }

  const handleContinueClick = () => {
    requiredFieldsFilled(incidentDetails)

    if (errors.length === 0) {
      dispatch({ type: 'proceedToExpenseReport' })
    } else {
      setMessage('You need to properly fill all required fields')
    }
  }

  const radioButtons: RadioButtons = [
    { label: 'tourism', value: 'tourism', checked: true },
    { label: 'study / mental work', value: 'study / mental work' },
    { value: 'physical work', label: 'physical work' },
    { value: 'high-risk sport', label: 'high-risk sport' },
  ]

  useEffect(() => {
    setErrors(getFieldsErrors(incidentDetails))
  }, [incidentDetails])

  return (
    <fieldset className={styles.step} aria-labelledby={currentStep.labelId}>
      <legend>
        <h2>{currentStep.name}</h2>
      </legend>
      <RadioGroup
        label="Purpose of Travel"
        groupName="travelPurpose"
        buttons={radioButtons}
        onChange={handleChangeDispatch(
          'changeIncidentDetails',
          incidentDetails.travelPurpose
        )}
      />
      <Input
        name="country"
        label="Country"
        type="text"
        required={true}
        value={incidentDetails.country}
        onChange={handleChangeDispatch(
          'changeIncidentDetails',
          incidentDetails.country
        )}
        onBlur={handleBlurDispatch(
          'changeIncidentDetails',
          textWithSpacesValidation,
          incidentDetails.country
        )}
      />
      <Input
        name="address"
        label="Address"
        type="text"
        value={incidentDetails.address}
        onChange={handleChangeDispatch(
          'changeIncidentDetails',
          incidentDetails.address
        )}
      />
      <Input
        name="date"
        label="Date"
        type="date"
        required={true}
        value={incidentDetails.date}
        onChange={handleChangeDispatch(
          'changeIncidentDetails',
          incidentDetails.date
        )}
        onBlur={handleBlurDispatch(
          'changeIncidentDetails',
          dateValidation,
          incidentDetails.date
        )}
        className={styles.dateInput}
      />
      <TextArea
        name="incidentDescription"
        label="Incident Description"
        value={incidentDetails.incidentDescription.value}
        rows={5}
        cols={30}
        onChange={handleChangeDispatch(
          'changeIncidentDetails',
          incidentDetails.incidentDescription
        )}
      />
      <div className={styles.navigation}>
        <div className={styles.buttonsWrapper}>
          <Button
            className={styles.back}
            variant="secondary"
            onClick={() => dispatch({ type: 'returnToPersonalDetails' })}
          >
            Back
          </Button>
          <Button
            className={styles.continue}
            variant="primary"
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </div>
        <p
          className={styles.finalValidationMessage}
          aria-atomic
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </fieldset>
  )
}
