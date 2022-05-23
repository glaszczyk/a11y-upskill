import styles from './IncidentDetailsScreen.module.scss'
import { Button } from '../../../../components/Button'
import { useContext } from 'react'
import { IncidentReportContext } from '../../IncidentReport'
import { Input } from '../../../../components/Input'

export const IncidentDetailsScreen = () => {
  const {
    state: { incidentDetails },
    dispatch,
  } = useContext(IncidentReportContext)

  return (
    <fieldset className={styles.step}>
      <Input
        name="travelPurpose"
        label="Purpose of Travel"
        type="text"
        value={incidentDetails.travelPurpose}
        dispatchType="changeTravelPurpose"
      />
      <Input
        name="country"
        label="Country"
        type="text"
        value={incidentDetails.country}
        dispatchType="changeCountry"
      />
      <Input
        name="address"
        label="Address"
        type="text"
        value={incidentDetails.address}
        dispatchType="changeAddress"
      />
      <Input
        name="date"
        label="Date"
        type="text"
        value={incidentDetails.date}
        dispatchType="changeDate"
      />
      <Input
        name="incidentDescription"
        label="Incident Description"
        type="text"
        value={incidentDetails.incidentDescription}
        dispatchType="changeIncidentDescription"
      />
      <div className={styles.navigation}>
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
          onClick={() => dispatch({ type: 'proceedToExpenseReport' })}
        >
          Continue
        </Button>
      </div>
    </fieldset>
  )
}
