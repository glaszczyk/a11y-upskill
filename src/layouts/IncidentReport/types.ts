export type PersonalDetails = {
  firstName: ValueWithError<string>
  secondName: ValueWithError<string>
  birthday: ValueWithError<string>
  phone: ValueWithError<string>
  email: ValueWithError<string>
  policyNo: ValueWithError<string>
}

export type IncidentDetails = {
  travelPurpose: ValueWithError<TravelPurpose>
  country: ValueWithError<string>
  address: ValueWithError<string>
  date: ValueWithError<string>
  incidentDescription: string
}
export type ValueWithError<T> = {
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
  cost: ValueWithError<string>
  description: ValueWithError<string>
}
export type PersonalDetailsKeys =
  | 'firstName'
  | 'secondName'
  | 'birthday'
  | 'phone'
  | 'email'
  | 'policyNo'

export type PersonalDetailsAction =
  | 'changeFirstName'
  | 'changeSecondName'
  | 'changeBirthday'
  | 'changePhone'
  | 'changeEmail'
  | 'changePolicyNo'
  | 'change'
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
  payload?: ValueWithError<string | number>
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
