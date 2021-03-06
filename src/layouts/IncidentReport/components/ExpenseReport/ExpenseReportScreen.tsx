import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classnames from 'classnames'
import { toast } from 'react-toastify'

import { Button } from '../../../../components/Button'
import { Dialog } from '../../../../components/Dialog'
import { Delete } from '../../../../components/Button/Delete'
import { Edit } from '../../../../components/Button/Edit'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { Expense, ExpenseReportAction } from '../../types'
import { ExpenseDialog } from '../ExpenseDialog'

import styles from './ExpenseReportScreen.module.scss'

const defaultExpense: Expense = {
  id: '',
  cost: { key: 'cost', value: '', error: '', required: true },
  description: { key: 'description', value: '', error: '', required: true },
}

type ExpenseReportScreenPropTypes = {
  currentStep: StepConfigItem
}

export const ExpenseReportScreen = ({
  currentStep,
}: ExpenseReportScreenPropTypes) => {
  const {
    state: { expenseReport },
    dispatch,
  } = useContext(IncidentReportContext)

  const [dialogDisplayed, setDialogDisplayed] = useState(false)
  const [deleteConfirmationDisplayed, setDeleteConfirmationDisplayed] =
    useState(false)
  const [expenseItem, setExpenseItem] = useState(defaultExpense)
  const [errors, setErrors] = useState<string[]>([])

  const requiredFieldsFilled = (expenseItem: Expense): void => {
    let updatedExpense = { ...expenseItem }
    if (!Boolean(expenseItem.cost.value)) {
      const updatedCost = {
        ...expenseItem.cost,
        error: 'Required field cannot be empty',
      }
      updatedExpense = { ...updatedExpense, cost: { ...updatedCost } }
    }
    if (!Boolean(expenseItem.description.value)) {
      const updatedDescription = {
        ...expenseItem.description,
        error: 'Required field cannot be empty',
      }
      updatedExpense = {
        ...updatedExpense,
        description: { ...updatedDescription },
      }
    }
    setExpenseItem(updatedExpense)
  }

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

  const handleDeleteConfirmationDialogClose = () => {
    setDeleteConfirmationDisplayed(false)
  }

  const handleAddNewExpense = () => {
    setExpenseItem({ ...defaultExpense, id: uuidv4() })
    setDialogDisplayed(true)
  }

  const handleExpenseDelete = (expense: Expense) => {
    setExpenseItem(expense)
    setDeleteConfirmationDisplayed(true)
  }

  const handleSubmitExpense = () => {
    if (
      !Boolean(expenseItem.cost.error) &&
      Boolean(expenseItem.cost.value) &&
      !Boolean(expenseItem.description.error) &&
      Boolean(expenseItem.description.value)
    ) {
      setDialogDisplayed(false)
      handleDispatch('addExpense', expenseItem)
      setExpenseItem(defaultExpense)
      toast.success('Expense added', { hideProgressBar: true })
    } else {
      requiredFieldsFilled(expenseItem)
    }
  }

  const handleRemove = (expense: Expense) => {
    handleDispatch('removeExpense', expense)
    setDeleteConfirmationDisplayed(false)
    toast.success('Expense removed', { hideProgressBar: true })
  }

  const submitReport = () => {
    if (errors.length === 0) {
      dispatch({ type: 'resetState' })
      toast.success('Report submitted successfully', {
        hideProgressBar: true,
      })
    }
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
                  handleExpenseDelete(expense)
                }}
              >
                <Delete />
              </Button>
              <Button
                variant="icon"
                className={styles.expenseIcon}
                onClick={() => handleEdit(expense)}
              >
                <Edit />
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

  const displayDeleteConfirmationDialog = (expense: Expense) => {
    return (
      deleteConfirmationDisplayed && (
        <Dialog
          onClose={handleDeleteConfirmationDialogClose}
          onSubmit={() => handleRemove(expense)}
          submitLabel={'Delete'}
        >
          <h2 id="dialog-title">Delete Expense</h2>
          <p
            aria-live="polite"
            aria-atomic={true}
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          >
            Do you want to remove expense {expense.description.value}
          </p>
        </Dialog>
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
    <fieldset className={styles.step} aria-labelledby={currentStep.labelId}>
      <legend>
        <h2>{currentStep.name}</h2>
      </legend>
      {displayExpenseDialog(expenseItem)}
      {displayDeleteConfirmationDialog(expenseItem)}
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
