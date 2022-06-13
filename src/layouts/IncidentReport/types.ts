export type PersonalDetails = {
  firstName: FieldValue<string>
  secondName: FieldValue<string>
  birthday: FieldValue<string>
  phone: FieldValue<string>
  email: FieldValue<string>
  policyNo: FieldValue<string>
}

export type IncidentDetails = {
  travelPurpose: FieldValue<TravelPurpose>
  country: FieldValue<string>
  address: FieldValue<string>
  date: FieldValue<string>
  incidentDescription: string
}
export type FieldValue<T> = {
  key?: PersonalDetailsKeys
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
  cost: FieldValue<string>
  description: FieldValue<string>
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
  | 'setRequiredEmpty'
  | 'proceedToIncidentDetails'

export type IncidentDetailsAction =
  | 'changeTravelPurpose'
  | 'changeCountry'
  | 'changeAddress'
  | 'changeDate'
  | 'changeIncidentDescription'
  | 'returnToPersonalDetails'
  | 'proceedToExpenseReport'

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
  payload?: FieldValue<string | number>
}
export type IncidentDetailsDispatchAction = {
  type: IncidentDetailsAction
  payload?: string
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
