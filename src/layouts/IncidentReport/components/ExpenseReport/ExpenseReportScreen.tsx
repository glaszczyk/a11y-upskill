import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import toast from 'react-hot-toast'

import styles from './ExpenseReportScreen.module.scss'
import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { Expense, ExpenseReportAction } from '../../types'
import DeleteIcon from '/public/trash.svg'
import EditIcon from '/public/pencil.svg'
import { ExpenseDialog } from '../ExpenseDialog'
import classnames from 'classnames'
import { Toast } from '../Toast/Toast'

const defaultExpense: Expense = {
  id: '',
  cost: { value: '', error: '' },
  description: { value: '', error: '' },
}

type ExpenseReportScreenPropTypes = {
  labelledBy: StepConfigItem
}

export const ExpenseReportScreen = ({
  labelledBy,
}: ExpenseReportScreenPropTypes) => {
  const [dialogDisplayed, setDialogDisplayed] = useState(false)
  const [expenseItem, setExpenseItem] = useState(defaultExpense)

  const {
    state: { expenseReport },
    dispatch,
  } = useContext(IncidentReportContext)

  const handleDispatch = (actionName: ExpenseReportAction, value: Expense) =>
    dispatch({
      type: actionName,
      payload: value,
    })

  const handleEdit = (expense: Expense) => {
    setExpenseItem(expense)
    setDialogDisplayed(true)
  }

  const handleValueChange = (key: 'cost' | 'description', value: string) => {
    const updatedValue = { ...expenseItem[key], value }
    const updatedExpense = { ...expenseItem, [key]: updatedValue }
    setExpenseItem(updatedExpense)
  }

  const handleError = (key: 'cost' | 'description', error: string) => {
    const updatedValue = { ...expenseItem[key], error }
    const updatedExpense = { ...expenseItem, [key]: updatedValue }
    setExpenseItem(updatedExpense)
  }

  const handleDialogClose = () => {
    setDialogDisplayed(false)
    setExpenseItem(defaultExpense)
  }

  const handleAddNewExpense = () => {
    setExpenseItem({ ...defaultExpense, id: uuidv4() })
    setDialogDisplayed(true)
  }

  const handleSubmitExpense = () => {
    setDialogDisplayed(false)
    handleDispatch('addExpense', expenseItem)
    setExpenseItem(defaultExpense)
    toast.custom(<Toast message="Expense added" type="success" />, {
      duration: 6000,
      position: 'bottom-right',
    })
  }

  const handleRemove = (expense: Expense) => {
    handleDispatch('removeExpense', expense)
    toast.custom(<Toast message="Expense removed" type="success" />, {
      duration: 6000,
      position: 'bottom-right',
    })
  }

  const submitReport = () => {
    dispatch({ type: 'resetState' })
    toast.custom(
      <Toast message="Report submitted successfully" type="success" />,
      {
        duration: 6000,
        position: 'bottom-right',
      }
    )
  }

  const getExpenses = (expenses: Expense[]) => {
    if (expenses.length) {
      return (
        <ol className={styles.expenses}>
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className={classnames(
                styles.expense,
                expense.cost.error ? styles.error : null
              )}
            >
              <span className={styles.cost}>{expense.cost.value}</span>
              <span className={styles.description}>
                {expense.description.value}
              </span>
              <Button
                variant="icon"
                className={styles.expenseIcon}
                onClick={() => {
                  handleRemove(expense)
                }}
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
                onClick={() => handleEdit(expense)}
              >
                <Image
                  src={EditIcon}
                  width={44}
                  height={44}
                  alt="Edit expense"
                />
              </Button>
            </li>
          ))}
        </ol>
      )
    }
    return <p aria-live="polite">No expenses</p>
  }

  const displayExpenseDialog = (expense: Expense) => {
    return (
      dialogDisplayed && (
        <ExpenseDialog
          expense={expense}
          onClose={handleDialogClose}
          onSubmit={handleSubmitExpense}
          onChange={handleValueChange}
          onBlur={handleError}
        />
      )
    )
  }

  const getErrorNotification = () => {
    const expensesWithError = expenseReport.reduce((acc, current) => {
      return !!(current.cost.error || current.description.error || acc)
    }, false)
    return expensesWithError ? (
      <p role="alert">Some expenses contain errors.</p>
    ) : null
  }

  useEffect(() => {
    dialogDisplayed && (document.body.style.overflow = 'hidden')
    !dialogDisplayed && (document.body.style.overflow = 'unset')
  }, [dialogDisplayed])

  return (
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
      {displayExpenseDialog(expenseItem)}
      {getExpenses(expenseReport)}
      {getErrorNotification()}
      <Button
        variant="link-like"
        className={styles.addExpense}
        onClick={handleAddNewExpense}
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
          onClick={submitReport}
        >
          Continue
        </Button>
      </div>
    </fieldset>
  )
}
