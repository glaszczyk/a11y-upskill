import styles from './PersonalDetailsScreen.module.scss'
import { useContext } from 'react'
import { Button } from '../../../../components/Button'
import { IncidentReportContext } from '../../IncidentReport'
import { Input } from '../../../../components/Input'

export const PersonalDetailsScreen = () => {
  const {
    state: { personalDetails },
    dispatch,
  } = useContext(IncidentReportContext)

  return (
    <fieldset className={styles.step}>
      <Input
        name="firstName"
        label="First Name"
        type="text"
        value={personalDetails.firstName}
        dispatchType="changeFirstName"
      />
      <Input
        name="secondName"
        label="Second Name"
        type="text"
        value={personalDetails.secondName}
        dispatchType="changeSecondName"
      />
      <Input
        name="birthday"
        label="Birthday"
        type="text"
        value={personalDetails.birthday}
        dispatchType="changeBirthday"
      />
      <Input
        name="phone"
        label="Phone number"
        type="text"
        value={personalDetails.phone}
        dispatchType="changePhone"
      />
      <Input
        name="email"
        label="Email"
        type="email"
        value={personalDetails.email}
        dispatchType="changeEmail"
      />
      <Input
        name="policyNo"
        label="Policy Number"
        type="text"
        value={personalDetails.policyNo}
        dispatchType="changePolicyNo"
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
