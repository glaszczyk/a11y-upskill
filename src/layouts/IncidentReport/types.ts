export type PersonalDetails = {
  firstName: FieldValue<PersonalDetailsKeys, string>
  secondName: FieldValue<PersonalDetailsKeys, string>
  birthday: FieldValue<PersonalDetailsKeys, string>
  phone: FieldValue<PersonalDetailsKeys, string>
  email: FieldValue<PersonalDetailsKeys, string>
  policyNo: FieldValue<PersonalDetailsKeys, string>
}

export type IncidentDetails = {
  travelPurpose: FieldValue<IncidentDetailsKeys, TravelPurpose>
  country: FieldValue<IncidentDetailsKeys, string>
  address: FieldValue<IncidentDetailsKeys, string>
  date: FieldValue<IncidentDetailsKeys, string>
  incidentDescription: FieldValue<IncidentDetailsKeys, string>
}

export type FieldValue<G, T> = {
  key?: G
} & InputValue<T>

export type InputValue<T> = {
  value: T
  error?: string
  required?: boolean
}

export type Expenses = Expense[]

export type ReportStep =
  | 'PERSONAL_DETAILS'
  | 'INCIDENT_DETAILS'
  | 'EXPENSE_REPORT'

export type TravelPurpose =
  | 'tourism'
  | 'study / mental work'
  | 'physical work'
  | 'high-risk sport'

export type Expense = {
  id: string
  cost: FieldValue<ExpenseDetailsKeys, string>
  description: FieldValue<ExpenseDetailsKeys, string>
  error?: string
}
export type PersonalDetailsKeys =
  | 'firstName'
  | 'secondName'
  | 'birthday'
  | 'phone'
  | 'email'
  | 'policyNo'

export type PersonalDetailsAction =
  | 'changePersonalDetails'
  | 'setRequiredPersonalDetailsEmpty'
  | 'proceedToIncidentDetails'

export type IncidentDetailsKeys =
  | 'travelPurpose'
  | 'country'
  | 'address'
  | 'date'
  | 'incidentDescription'

export type IncidentDetailsAction =
  | 'changeIncidentDetails'
  | 'setRequiredIncidentDetailsEmpty'
  | 'returnToPersonalDetails'
  | 'proceedToExpenseReport'

export type ExpenseDetailsKeys = 'cost' | 'description'

export type ExpenseReportAction =
  | 'addExpense'
  | 'editExpense'
  | 'removeExpense'
  | 'returnToIncidentDetails'
  | 'resetState'

export type ReportDispatchAction =
  | PersonalDetailsDispatchAction
  | IncidentDetailsDispatchAction
  | ExpenseReportDispatchAction

export type PersonalDetailsDispatchAction = {
  type: PersonalDetailsAction
  payload?: FieldValue<PersonalDetailsKeys, string | number>
}
export type IncidentDetailsDispatchAction = {
  type: IncidentDetailsAction
  payload?: FieldValue<IncidentDetailsKeys, string | number>
}
export type ExpenseReportDispatchAction = {
  type: ExpenseReportAction
  payload: Expense
}

export type ReportState = {
  step: ReportStep
  personalDetails: PersonalDetails
  incidentDetails: IncidentDetails
  expenseReport: Expenses
}

type RadioButton = { label: string; value: string; checked?: boolean }

export type RadioButtons = RadioButton[]
