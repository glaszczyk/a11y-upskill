import { FormEvent } from 'react'

import { Button } from '../../../../../../components/Button'
import { Expense } from '../../../../types'
import { Input } from '../../../../../../components/Input'

import styles from './ExpenseDialog.module.scss'

type ExpenseDialogPropTypes = {
  expense: Expense
  onClose: () => void
  onCostChange: (e: FormEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: FormEvent<HTMLInputElement>) => void
  onSubmit: () => void
}
export const ExpenseDialog = ({
  expense,
  onClose,
  onCostChange,
  onDescriptionChange,
  onSubmit,
}: ExpenseDialogPropTypes) => {
  return (
    <>
      <div className={styles.modalBackground}></div>
      <div
        role="dialog"
        className={styles.dialog}
        aria-labelledby="dialog-title"
      >
        <Button className={styles.close} variant="icon" onClick={onClose}>
          x
        </Button>
        <div className={styles.content}>
          <h2 id="dialog-title">Expense</h2>
          <Input
            name="travelPurpose"
            label="Name"
            type="text"
            value={expense.description}
            onChange={onDescriptionChange}
          />
          <Input
            name="travelPurpose"
            label="Price"
            type="text"
            value={expense.cost}
            onChange={onCostChange}
          />
          <div className={styles.navigation}>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
