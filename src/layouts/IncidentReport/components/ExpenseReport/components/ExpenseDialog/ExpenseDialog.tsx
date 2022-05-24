import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '../../../../../../components/Button'

import styles from './ExpenseDialog.module.scss'
import { Expense } from '../../../../types'

type ExpenseDialogPropTypes = {
  onClose: () => void
  expense?: Expense
}
export const ExpenseDialog = ({
  expense = { id: uuidv4(), cost: '', description: '' },
  onClose,
}: ExpenseDialogPropTypes) => {
  const [expenseItem, setExpenseItem] = useState(expense)
  return (
    <div role="dialog" className={styles.dialog} aria-labelledby="dialog-title">
      <Button className={styles.close} variant="icon" onClick={onClose}>
        x
      </Button>
      <div className={styles.content}>
        <h2 id="dialog-title">Expense</h2>
        Here is dialog modal
      </div>
    </div>
  )
}
