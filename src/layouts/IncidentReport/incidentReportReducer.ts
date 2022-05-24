import {
  Expense,
  ExpenseReport,
  IncidentDetailsDispatchAction,
  PersonalDetailsDispatchAction,
  ReportDispatchAction,
  ReportState,
} from './types'

const setPersonalDetails = (
  state: ReportState,
  key: PropertyKey,
  { payload }: PersonalDetailsDispatchAction
): ReportState => {
  const { personalDetails } = state
  const updatedPersonalDetails = {
    ...personalDetails,
    [key]: payload,
  }
  return {
    ...state,
    personalDetails: { ...updatedPersonalDetails },
  }
}

const setIncidentDetails = (
  state: ReportState,
  key: PropertyKey,
  { payload }: IncidentDetailsDispatchAction
): ReportState => {
  const { incidentDetails } = state
  const updatedIncidentDetails = {
    ...incidentDetails,
    [key]: payload,
  }
  return {
    ...state,
    incidentDetails: { ...updatedIncidentDetails },
  }
}

const manageExpenseOperation = (
  state: ReportState,
  expenseReport: ExpenseReport
): ReportState => {
  return {
    ...state,
    expenseReport: [...expenseReport],
  }
}

const removeExpense = (state: ReportState, expenseFound: Expense) => {
  const { expenseReport } = state
  const filteredExpenseReport = expenseReport.filter(
    (expense: Expense) => expense.id !== expenseFound.id
  )
  return manageExpenseOperation(state, filteredExpenseReport)
}
export const incidentReportReducer = (
  state: ReportState,
  action: ReportDispatchAction
): ReportState => {
  switch (action.type) {
    case 'changeFirstName':
      return setPersonalDetails(state, 'firstName', action)
    case 'changeSecondName':
      return setPersonalDetails(state, 'secondName', action)
    case 'changeBirthday':
      return setPersonalDetails(state, 'birthday', action)
    case 'changePhone':
      return setPersonalDetails(state, 'phone', action)
    case 'changeEmail':
      return setPersonalDetails(state, 'email', action)
    case 'changePolicyNo':
      return setPersonalDetails(state, 'policyNo', action)
    case 'changeTravelPurpose':
      return setIncidentDetails(state, 'travelPurpose', action)
    case 'changeCountry':
      return setIncidentDetails(state, 'country', action)
    case 'changeAddress':
      return setIncidentDetails(state, 'address', action)
    case 'changeDate':
      return setIncidentDetails(state, 'date', action)
    case 'changeIncidentDescription':
      return setIncidentDetails(state, 'incidentDescription', action)
    case 'removeExpense':
      return removeExpense(state, action.payload)
    case 'proceedToIncidentDetails':
      return { ...state, step: 'INCIDENT_DETAILS' }
    case 'returnToPersonalDetails':
      return { ...state, step: 'PERSONAL_DETAILS' }
    case 'proceedToExpenseReport':
      return { ...state, step: 'EXPENSE_REPORT' }
    default:
      throw new Error()
  }
}
