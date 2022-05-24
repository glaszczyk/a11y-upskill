import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './ExpenseReportScreen.module.scss'
import { Button } from '../../../../components/Button'
import { IncidentReportContext } from '../../IncidentReport'
import { Expense, ExpenseReportAction } from '../../types'
import DeleteIcon from '/public/trash.svg'
import EditIcon from '/public/pencil.svg'
import { ExpenseDialog } from './components/ExpenseDialog'

export const ExpenseReportScreen = () => {
  const [dialogDisplayed, setDialogDisplayed] = useState(false)

  const {
    state: { expenseReport },
    dispatch,
  } = useContext(IncidentReportContext)

  const handleDispatch = (actionName: ExpenseReportAction, value: Expense) =>
    dispatch({
      type: actionName,
      payload: value,
    })

  const getExpenses = (expenses: Expense[]) => (
    <ol className={styles.expenses}>
      {expenses.map((expense) => (
        <li key={expense.id} className={styles.expense}>
          <span className={styles.cost}>{expense.cost}</span>
          <span className={styles.description}>{expense.description}</span>
          <Button
            variant="icon"
            className={styles.expenseIcon}
            onClick={() => handleDispatch('removeExpense', expense)}
          >
            <Image
              src={DeleteIcon}
              width={44}
              height={44}
              alt="Delete expense"
            />
          </Button>
          <Button
            variant="icon"
            className={styles.expenseIcon}
            onClick={() => {
              setDialogDisplayed(true)
            }}
          >
            <Image src={EditIcon} width={44} height={44} alt="Edit expense" />
          </Button>
        </li>
      ))}
    </ol>
  )

  const displayExpenseDialog = (expense?: Expense) => {
    return (
      dialogDisplayed && (
        <>
          <div className={styles.modalBackground}></div>
          <ExpenseDialog
            expense={expense}
            onClose={() => setDialogDisplayed(false)}
          />
        </>
      )
    )
  }

  useEffect(() => {
    dialogDisplayed && (document.body.style.overflow = 'hidden')
    !dialogDisplayed && (document.body.style.overflow = 'unset')
  }, [dialogDisplayed])

  return (
    <fieldset className={styles.step}>
      {displayExpenseDialog()}
      {getExpenses(expenseReport)}
      <Button
        variant="link-like"
        className={styles.addExpense}
        onClick={() => setDialogDisplayed(true)}
      >
        + Add another expense
      </Button>

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
