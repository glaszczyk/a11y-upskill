import { useContext, useState } from 'react'

import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { PersonalDetailsAction, ValueWithError } from '../../types'
import { Input } from '../../../../components/Input'

import styles from './PersonalDetailsScreen.module.scss'
import {
  emailValidation,
  numberValidation,
  phoneValidation,
  textValidation,
} from '../../validators'

const filterErrors = (array: ErrorIndicator[], error: ErrorIndicator) =>
  array.filter((el) => el.actionName !== error.actionName)

type ErrorIndicator = {
  actionName: PersonalDetailsAction
  value: string
}

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

  const [errors, setErrors] = useState<ErrorIndicator[]>([])
  const [message, setMessage] = useState('')

  const handleChangeDispatch =
    (
      actionName: PersonalDetailsAction,
      currentValue: ValueWithError<string | number>
    ) =>
    (value: string) =>
      dispatch({
        type: actionName,
        payload: { ...currentValue, value },
      })

  const handleBlurDispatch =
    (
      actionName: PersonalDetailsAction,
      callback: (value: string) => string,
      currentValue: ValueWithError<string | number>
    ) =>
    (value: string) => {
      const error = callback(value)
      const errorIndicator: ErrorIndicator = { actionName, value: error }
      dispatch({
        type: actionName,
        payload: { ...currentValue, error },
      })
      const updatedErrors = filterErrors(errors, errorIndicator)
      error === ''
        ? setErrors([...updatedErrors])
        : setErrors([...updatedErrors, errorIndicator])
    }

  const handleContinueClick = () => {
    if (errors.length === 0) {
      dispatch({ type: 'proceedToIncidentDetails' })
    } else {
      setMessage('You need to properly fill all required fields')
    }
  }

  return (
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
      <Input
        name="firstName"
        label="First Name"
        type="text"
        required={true}
        value={personalDetails.firstName}
        onChange={handleChangeDispatch(
          'changeFirstName',
          personalDetails.firstName
        )}
        onBlur={handleBlurDispatch(
          'changeFirstName',
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
