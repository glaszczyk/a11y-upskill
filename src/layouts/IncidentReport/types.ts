export type PersonalDetails = {
  firstName: string
  secondName: string
  birthday: string
  phone: string
  email: string
  policyNo: string
}

export type IncidentDetails = {
  travelPurpose: TravelPurpose
  country: string
  address: string
  date: string
  incidentDescription: string
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
  cost: string
  description: string
}

export type PersonalDetailsAction =
  | 'changeFirstName'
  | 'changeSecondName'
  | 'changeBirthday'
  | 'changePhone'
  | 'changeEmail'
  | 'changePolicyNo'
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
  | 'submitReport'

export type ReportDispatchAction =
  | PersonalDetailsDispatchAction
  | IncidentDetailsDispatchAction
  | ExpenseReportDispatchAction

export type PersonalDetailsDispatchAction = {
  type: PersonalDetailsAction
  payload?: string
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
