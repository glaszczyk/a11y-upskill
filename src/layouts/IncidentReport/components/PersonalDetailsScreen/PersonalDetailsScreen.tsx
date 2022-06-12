import { useContext, useEffect, useState } from 'react'

import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import {
  PersonalDetails,
  PersonalDetailsAction,
  ValueWithError,
} from '../../types'
import { Input } from '../../../../components/Input'

import styles from './PersonalDetailsScreen.module.scss'
import {
  dateValidation,
  emailValidation,
  numberValidation,
  phoneValidation,
  textValidation,
} from '../../validators'

type PersonalDetailsScreenPropTypes = {
  labelledBy: StepConfigItem
}

export const PersonalDetailsScreen = ({
  labelledBy,
}: PersonalDetailsScreenPropTypes) => {
  const {
    state: { personalDetails },
    dispatch,
  } = useContext(IncidentReportContext)

  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState('')

  const requiredFieldsFilled = (fields: PersonalDetails) =>
    (Object.keys(fields) as (keyof typeof fields)[]).forEach((element) => {
      if (fields[element].required && !Boolean(fields[element].value))
        dispatch({ type: 'setRequiredEmpty', payload: fields[element] })
    })

  const getFieldsErrors = (fields: PersonalDetails) =>
    (Object.keys(fields) as (keyof typeof fields)[]).reduce((acc, current) => {
      const isValidField =
        fields[current].required &&
        Boolean(fields[current].value) &&
        !Boolean(fields[current].error)

      return isValidField ? [...acc] : [...acc, current]
    }, [] as (keyof typeof fields)[])

  const handleChangeDispatch =
    (
      actionName: PersonalDetailsAction,
      currentValue: ValueWithError<string | number>
    ) =>
    (value: string) => {
      dispatch({
        type: actionName,
        payload: { ...currentValue, value },
      })
    }

  const handleBlurDispatch =
    (
      actionName: PersonalDetailsAction,
      callback: (value: string) => string,
      currentValue: ValueWithError<string | number>
    ) =>
    (value: string) => {
      const error = callback(value)
      dispatch({
        type: actionName,
        payload: { ...currentValue, error },
      })
    }

  const handleContinueClick = () => {
    requiredFieldsFilled(personalDetails)

    if (errors.length === 0) {
      dispatch({ type: 'proceedToIncidentDetails' })
    } else {
      setMessage('You need to properly fill all required fields')
    }
  }

  useEffect(() => {
    setErrors(getFieldsErrors(personalDetails))
  }, [personalDetails])

  return (
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
      <Input
        name="firstName"
        label="First Name"
        type="text"
        required={true}
        value={personalDetails.firstName}
        onChange={handleChangeDispatch('change', personalDetails.firstName)}
        onBlur={handleBlurDispatch(
          'change',
          textValidation,
          personalDetails.firstName
        )}
      />
      <Input
        name="secondName"
        label="Second Name"
        type="text"
        required={true}
        value={personalDetails.secondName}
        onChange={handleChangeDispatch(
          'changeSecondName',
          personalDetails.secondName
        )}
        onBlur={handleBlurDispatch(
          'changeSecondName',
          textValidation,
          personalDetails.secondName
        )}
      />
      <Input
        name="birthday"
        label="Birthday"
        type="date"
        required={true}
        value={personalDetails.birthday}
        onChange={handleChangeDispatch(
          'changeBirthday',
          personalDetails.birthday
        )}
        onBlur={handleBlurDispatch(
          'changeBirthday',
          dateValidation,
          personalDetails.birthday
        )}
        className={styles.dateInput}
      />
      <Input
        name="phone"
        label="Phone number"
        type="tel"
        required={true}
        value={personalDetails.phone}
        onChange={handleChangeDispatch('changePhone', personalDetails.phone)}
        onBlur={handleBlurDispatch(
          'changePhone',
          phoneValidation,
          personalDetails.phone
        )}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        required={true}
        value={personalDetails.email}
        onChange={handleChangeDispatch('changeEmail', personalDetails.email)}
        onBlur={handleBlurDispatch(
          'changeEmail',
          emailValidation,
          personalDetails.email
        )}
      />
      <Input
        name="policyNo"
        label="Policy Number"
        type="number"
        required={true}
        value={personalDetails.policyNo}
        onChange={handleChangeDispatch(
          'changePolicyNo',
          personalDetails.policyNo
        )}
        onBlur={handleBlurDispatch(
          'changePolicyNo',
          numberValidation,
          personalDetails.policyNo
        )}
      />
      <div className={styles.navigation}>
        <div className={styles.buttonsWrapper}>
          <Button
            className={styles.back}
            variant="secondary"
            onClick={() => null}
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
