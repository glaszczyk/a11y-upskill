import { useContext } from 'react'

import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { PersonalDetailsAction } from '../../types'
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

  const handleDispatch =
    (actionName: PersonalDetailsAction) => (value: string) =>
      dispatch({
        type: actionName,
        payload: value,
      })

  return (
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
      <Input
        name="firstName"
        label="First Name"
        type="text"
        value={personalDetails.firstName}
        onChange={handleDispatch('changeFirstName')}
      />
      <Input
        name="secondName"
        label="Second Name"
        type="text"
        value={personalDetails.secondName}
        onChange={handleDispatch('changeSecondName')}
      />
      <Input
        name="birthday"
        label="Birthday"
        type="date"
        value={personalDetails.birthday}
        onChange={handleDispatch('changeBirthday')}
        className={styles.dateInput}
      />
      <Input
        name="phone"
        label="Phone number"
        type="text"
        value={personalDetails.phone}
        onChange={handleDispatch('changePhone')}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        value={personalDetails.email}
        onChange={handleDispatch('changeEmail')}
      />
      <Input
        name="policyNo"
        label="Policy Number"
        type="text"
        value={personalDetails.policyNo}
        onChange={handleDispatch('changePolicyNo')}
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
