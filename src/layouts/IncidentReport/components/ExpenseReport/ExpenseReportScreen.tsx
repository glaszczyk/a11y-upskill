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
import { Toast } from '../Toast'
import { Dialog } from '../../../../components/Dialog'

const defaultExpense: Expense = {
  id: '',
  cost: { key: 'cost', value: '', error: '', required: true },
  description: { key: 'description', value: '', error: '', required: true },
}

type ExpenseReportScreenPropTypes = {
  labelledBy: StepConfigItem
}

export const ExpenseReportScreen = ({
  labelledBy,
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
      toast.custom(<Toast message="Expense added" type="success" />, {
        duration: 6000,
        position: 'bottom-right',
      })
    } else {
      requiredFieldsFilled(expenseItem)
    }
  }

  const handleRemove = (expense: Expense) => {
    handleDispatch('removeExpense', expense)
    setDeleteConfirmationDisplayed(false)
    toast.custom(<Toast message="Expense removed" type="success" />, {
      duration: 6000,
      position: 'bottom-right',
    })
  }

  const submitReport = () => {
    if (errors.length === 0) {
      dispatch({ type: 'resetState' })
      toast.custom(
        <Toast message="Report submitted successfully" type="success" />,
        {
          duration: 6000,
          position: 'bottom-right',
        }
      )
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

  const displayDeleteConfirmationDialog = (expense: Expense) => {
    return (
      deleteConfirmationDisplayed && (
        <Dialog
          onClose={handleDeleteConfirmationDialogClose}
          onSubmit={() => handleRemove(expense)}
          submitLabel={'Delete'}
        >
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
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
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
