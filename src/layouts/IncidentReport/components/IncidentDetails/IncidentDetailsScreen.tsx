import styles from './IncidentDetailsScreen.module.scss'
import { Button } from '../../../../components/Button'
import { FormEvent, useContext } from 'react'
import { IncidentReportContext } from '../../IncidentReport'
import { TextArea } from '../../../../components/TextArea'
import { IncidentDetailsAction } from '../../types'
import { Input } from '../../../../components/Input'

export const IncidentDetailsScreen = () => {
  const {
    state: { incidentDetails },
    dispatch,
  } = useContext(IncidentReportContext)

  const handleDispatch =
    (actionName: IncidentDetailsAction) => (e: FormEvent<HTMLInputElement>) =>
      dispatch({
        type: actionName,
        payload: e.currentTarget.value,
      })

  return (
    <fieldset className={styles.step}>
      <Input
        name="travelPurpose"
        label="Purpose of Travel"
        type="text"
        value={incidentDetails.travelPurpose}
        onChange={handleDispatch('changeTravelPurpose')}
      />
      <Input
        name="country"
        label="Country"
        type="text"
        value={incidentDetails.country}
        onChange={handleDispatch('changeCountry')}
      />
      <Input
        name="address"
        label="Address"
        type="text"
        value={incidentDetails.address}
        onChange={handleDispatch('changeAddress')}
      />
      <Input
        name="date"
        label="Date"
        type="text"
        value={incidentDetails.date}
        onChange={handleDispatch('changeDate')}
      />
      <TextArea
        name="incidentDescription"
        label="Incident Description"
        value={incidentDetails.incidentDescription}
        rows={5}
        cols={30}
        onChange={(e: FormEvent<HTMLTextAreaElement>) =>
          dispatch({
            type: 'changeIncidentDescription',
            payload: e.currentTarget.value,
          })
        }
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
