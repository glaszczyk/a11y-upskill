import { FormEvent, useContext } from 'react'

import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { TextArea } from '../../../../components/TextArea'
import {
  IncidentDetailsAction,
  RadioButtons,
  ValueWithError,
} from '../../types'
import { Input } from '../../../../components/Input'
import { RadioGroup } from '../../../../components/RadioGroup'

import styles from './IncidentDetailsScreen.module.scss'
import { textValidation } from '../../validators'

type PersonalDetailsScreenPropTypes = {
  labelledBy: StepConfigItem
}

export const IncidentDetailsScreen = ({
  labelledBy,
}: PersonalDetailsScreenPropTypes) => {
  const {
    state: { incidentDetails },
    dispatch,
  } = useContext(IncidentReportContext)

  const handleChangeDispatch =
    (
      actionName: IncidentDetailsAction,
      currentValue: ValueWithError<string | number>
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
      currentValue: ValueWithError<string | number>
    ) =>
    (value: string) => {
      const error = callback(value)
      dispatch({
        type: actionName,
        payload: { ...currentValue, error },
      })
    }

  const radioButtons: RadioButtons = [
    { label: 'tourism', value: 'tourism', checked: true },
    { label: 'study / mental work', value: 'study / mental work' },
    { value: 'physical work', label: 'physical work' },
    { value: 'high-risk sport', label: 'high-risk sport' },
  ]

  return (
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
      <RadioGroup
        label="Purpose of Travel"
        groupName="travelPurpose"
        buttons={radioButtons}
        onChange={handleChangeDispatch(
          'changeTravelPurpose',
          incidentDetails.travelPurpose
        )}
      />
      <Input
        name="country"
        label="Country"
        type="text"
        value={incidentDetails.country}
        onChange={handleChangeDispatch(
          'changeCountry',
          incidentDetails.country
        )}
        onBlur={handleBlurDispatch(
          'changeCountry',
          textValidation,
          incidentDetails.country
        )}
      />
      <Input
        name="address"
        label="Address"
        type="text"
        value={incidentDetails.address}
        onChange={handleChangeDispatch(
          'changeAddress',
          incidentDetails.address
        )}
      />
      <Input
        name="date"
        label="Date"
        type="date"
        value={incidentDetails.date}
        onChange={handleChangeDispatch('changeDate', incidentDetails.date)}
        className={styles.dateInput}
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
