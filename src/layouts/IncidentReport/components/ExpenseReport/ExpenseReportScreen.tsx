import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

import styles from './ExpenseReportScreen.module.scss'
import { Button } from '../../../../components/Button'
import { IncidentReportContext, StepConfigItem } from '../../IncidentReport'
import { Expense, ExpenseReportAction } from '../../types'
import DeleteIcon from '/public/trash.svg'
import EditIcon from '/public/pencil.svg'
import { ExpenseDialog } from '../ExpenseDialog'

const defaultExpense: Expense = {
  id: '',
  cost: { value: '', error: '' },
  description: { value: '' },
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
  }
  const getExpenses = (expenses: Expense[]) => (
    <ol className={styles.expenses}>
      {expenses.map((expense) => (
        <li key={expense.id} className={styles.expense}>
          <span className={styles.cost}>{expense.cost.value}</span>
          <span className={styles.description}>
            {expense.description.value}
          </span>
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
            onClick={() => handleEdit(expense)}
          >
            <Image src={EditIcon} width={44} height={44} alt="Edit expense" />
          </Button>
        </li>
      ))}
    </ol>
  )

  const displayExpenseDialog = (expense: Expense) => {
    return (
      dialogDisplayed && (
        <ExpenseDialog
          expense={expense}
          onClose={handleDialogClose}
          onSubmit={handleSubmitExpense}
          onChange={handleValueChange}
        />
      )
    )
  }

  useEffect(() => {
    dialogDisplayed && (document.body.style.overflow = 'hidden')
    !dialogDisplayed && (document.body.style.overflow = 'unset')
  }, [dialogDisplayed])

  return (
    <fieldset className={styles.step} aria-labelledby={labelledBy.labelId}>
      {displayExpenseDialog(expenseItem)}
      {getExpenses(expenseReport)}
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
          onClick={() => dispatch({ type: 'submitReport' })}
        >
          Continue
        </Button>
      </div>
    </fieldset>
  )
}
