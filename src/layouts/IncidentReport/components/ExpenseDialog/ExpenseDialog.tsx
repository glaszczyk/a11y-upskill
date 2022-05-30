import { Button } from '../../../../components/Button'
import { Expense } from '../../types'
import { Input } from '../../../../components/Input'

import styles from './ExpenseDialog.module.scss'

type ExpenseDialogPropTypes = {
  expense: Expense
  onClose: () => void
  onChange: (key: 'cost' | 'description', value: string) => void
  onSubmit: () => void
}
export const ExpenseDialog = ({
  expense,
  onClose,
  onChange,
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
            name="travel-description"
            label="Name"
            type="text"
            value={expense.description}
            onChange={(value: string) => onChange('description', value)}
            required={true}
          />
          <Input
            name="travel-price"
            label="Price"
            type="number"
            pattern="\d{1,5}"
            value={expense.cost}
            onChange={(value: string) => onChange('cost', value)}
            required={true}
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
