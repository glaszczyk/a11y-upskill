import { Expense } from '../../types'
import { Input } from '../../../../components/Input'

import { nonEmptyNumber, nonEmptyText } from '../../validators'
import { Dialog } from '../../../../components/Dialog'

type ExpenseDialogPropTypes = {
  expense: Expense
  onClose: () => void
  onChange: (key: 'cost' | 'description', value: string) => void
  onBlur: (key: 'cost' | 'description', error: string) => void
  onSubmit: () => void
}

export const ExpenseDialog = ({
  expense,
  onClose,
  onChange,
  onBlur,
  onSubmit,
}: ExpenseDialogPropTypes) => {
  const handleBlur = (
    key: 'cost' | 'description',
    callback: (value: string) => string,
    currentValue: string
  ) => {
    const error = callback(currentValue)
    onBlur(key, error)
  }

  return (
    <Dialog onClose={onClose} onSubmit={onSubmit}>
      <h2 id="dialog-title">Expense</h2>
      <Input
        name="travel-description"
        label="Name"
        type="text"
        value={expense.description}
        onChange={(value: string) => onChange('description', value)}
        onBlur={(value: string) =>
          handleBlur('description', nonEmptyText, value)
        }
        required={true}
      />
      <Input
        name="travel-price"
        label="Price"
        type="number"
        pattern="\d{1,5}"
        value={expense.cost}
        onChange={(value: string) => onChange('cost', value)}
        onBlur={(value: string) => handleBlur('cost', nonEmptyNumber, value)}
        required={true}
      />
    </Dialog>
  )
}
