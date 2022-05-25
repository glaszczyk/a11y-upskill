import { FormEvent, useContext } from 'react'

import { Button } from '../../../../components/Button'
import { IncidentReportContext } from '../../IncidentReport'
import { TextArea } from '../../../../components/TextArea'
import { IncidentDetailsAction, RadioButtons } from '../../types'
import { Input } from '../../../../components/Input'
import { RadioGroup } from '../../../../components/RadioGroup'

import styles from './IncidentDetailsScreen.module.scss'

export const IncidentDetailsScreen = () => {
  const {
    state: { incidentDetails },
    dispatch,
  } = useContext(IncidentReportContext)

  const handleDispatch =
    (actionName: IncidentDetailsAction) => (value: string) =>
      dispatch({
        type: actionName,
        payload: value,
      })

  const radioButtons: RadioButtons = [
    { label: 'tourism', value: 'tourism', checked: true },
    { label: 'study / mental work', value: 'study / mental work' },
    { value: 'physical work', label: 'physical work' },
    { value: 'high-risk sport', label: 'high-risk sport' },
  ]

  return (
    <fieldset className={styles.step}>
      <RadioGroup
        label="Purpose of Travel"
        groupName="travelPurpose"
        buttons={radioButtons}
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
