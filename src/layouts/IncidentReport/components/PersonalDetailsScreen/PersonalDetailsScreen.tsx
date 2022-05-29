import { useContext } from 'react'

import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { PersonalDetailsAction, ValueWithError } from '../../types'
import { Input } from '../../../../components/Input'

import styles from './PersonalDetailsScreen.module.scss'

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
      dispatch({
        type: actionName,
        payload: { ...currentValue, error },
      })
    }

  const textValidationError = (value: string) => {
    const nameReg = /^[A-Za-z]*$/
    if (!nameReg.test(value)) {
      return 'Text only values expected'
    } else {
      return ''
    }
  }

  const phoneValidationError = (value: string) => {
    const nameReg = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    if (!nameReg.test(value)) {
      return 'There was an error with the input above.'
    } else {
      return ''
    }
  }

  return (
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
      <Input
        name="firstName"
        label="First Name"
        type="text"
        value={personalDetails.firstName}
        onChange={handleChangeDispatch(
          'changeFirstName',
          personalDetails.firstName
        )}
        onBlur={handleBlurDispatch(
          'changeFirstName',
          textValidationError,
          personalDetails.firstName
        )}
      />
      <Input
        name="secondName"
        label="Second Name"
        type="text"
        value={personalDetails.secondName}
        onChange={handleChangeDispatch(
          'changeSecondName',
          personalDetails.secondName
        )}
        onBlur={handleBlurDispatch(
          'changeSecondName',
          textValidationError,
          personalDetails.secondName
        )}
      />
      <Input
        name="birthday"
        label="Birthday"
        type="date"
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
        value={personalDetails.phone}
        onChange={handleChangeDispatch('changePhone', personalDetails.phone)}
        onBlur={handleBlurDispatch(
          'changePhone',
          phoneValidationError,
          personalDetails.phone
        )}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        value={personalDetails.email}
        onChange={handleChangeDispatch('changeEmail', personalDetails.email)}
      />
      <Input
        name="policyNo"
        label="Policy Number"
        type="text"
        value={personalDetails.policyNo}
        onChange={handleChangeDispatch(
          'changePolicyNo',
          personalDetails.policyNo
        )}
      />
      <div className={styles.navigation}>
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
          onClick={() => dispatch({ type: 'proceedToIncidentDetails' })}
        >
          Continue
        </Button>
      </div>
    </fieldset>
  )
}
