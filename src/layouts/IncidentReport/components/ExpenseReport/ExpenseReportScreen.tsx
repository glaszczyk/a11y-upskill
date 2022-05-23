import styles from './ExpenseReportScreen.module.scss'
import { Button } from '../../../../components/Button'
import { useContext } from 'react'
import { IncidentReportContext } from '../../IncidentReport'

export const ExpenseReportScreen = () => {
  const {
    state: { expenseReport },
    dispatch,
  } = useContext(IncidentReportContext)

  return (
    <fieldset className={styles.step}>
      <div className={styles.navigation}>
        <Button
          className={styles.back}
          variant="secondary"
          onClick={() => dispatch({ type: 'returnToIncidentDetails' })}
        >
          Back
        </Button>
        <Button
          className={styles.continue}
          variant="primary"
          onClick={() => dispatch({ type: 'submitReport' })}
        >
          Continue
        </Button>
      </div>
    </fieldset>
  )
}
