import {
  Expense,
  Expenses,
  IncidentDetailsDispatchAction,
  PersonalDetailsDispatchAction,
  ReportDispatchAction,
  ReportState,
} from './types'
import { v4 as uuidv4 } from 'uuid'

export const defaultState: ReportState = {
  step: 'PERSONAL_DETAILS',
  personalDetails: {
    firstName: { key: 'firstName', value: '', error: '', required: true },
    secondName: { key: 'secondName', value: '', error: '', required: true },
    birthday: { key: 'birthday', value: '', error: '', required: true },
    email: { key: 'email', value: '', error: '', required: true },
    phone: { key: 'phone', value: '', error: '', required: true },
    policyNo: { key: 'policyNo', value: '', error: '', required: true },
  },
  incidentDetails: {
    country: { value: '', error: '' },
    incidentDescription: '',
    address: { value: '', error: '' },
    date: { value: '', error: '' },
    travelPurpose: { value: 'tourism', error: '' },
  },
  expenseReport: [
    {
      id: uuidv4(),
      cost: { value: '30', error: '' },
      description: { value: 'expense no 1' },
    },
    {
      id: uuidv4(),
      cost: { value: '60', error: '' },
      description: { value: 'expense no 2' },
    },
  ],
}

type ReportSlice = 'personalDetails' | 'incidentDetails' | 'expenseReport'

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

const updateExpenseReport = (
  state: ReportState,
  expenseReport: Expenses
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
  return updateExpenseReport(state, filteredExpenseReport)
}

const addExpense = (state: ReportState, newExpense: Expense) => {
  const { expenseReport } = state
  const existingExpense = expenseReport.some(
    (expense: Expense) => expense.id === newExpense.id
  )

  const newExpenses = (): Expenses => {
    if (existingExpense) {
      return expenseReport.reduce((acc: Expenses, current: Expense) => {
        return current.id === newExpense.id
          ? [...acc, newExpense]
          : [...acc, current]
      }, [] as Expenses)
    }
    return [...expenseReport, newExpense]
  }

  return updateExpenseReport(state, newExpenses())
}
const change = (
  state: ReportState,
  slice: ReportSlice,
  { payload }: PersonalDetailsDispatchAction
): ReportState => {
  const sliceData = state[slice]
  const key = payload?.key || 'firstName'
  const updatedSlice = {
    ...sliceData,
    [key]: { ...payload },
  }
  return {
    ...state,
    [slice]: { ...updatedSlice },
  }
}

const setRequiredEmptyError = (
  state: ReportState,
  { payload }: PersonalDetailsDispatchAction
): ReportState => {
  const { personalDetails } = state
  const key = payload?.key || 'firstName'
  const updatedPersonalDetails = {
    ...personalDetails,
    [key]: {
      ...personalDetails[key],
      error: 'Required field cannot be empty',
    },
  }
  return {
    ...state,
    personalDetails: { ...updatedPersonalDetails },
  }
}

export const incidentReportReducer = (
  state: ReportState,
  action: ReportDispatchAction
): ReportState => {
  switch (action.type) {
    case 'setRequiredEmpty':
      return setRequiredEmptyError(state, action)
    case 'changePersonalDetails':
      return change(state, 'personalDetails', action)
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
    case 'addExpense':
      return addExpense(state, action.payload)
    case 'proceedToIncidentDetails':
      return { ...state, step: 'INCIDENT_DETAILS' }
    case 'returnToIncidentDetails':
      return { ...state, step: 'INCIDENT_DETAILS' }
    case 'returnToPersonalDetails':
      return { ...state, step: 'PERSONAL_DETAILS' }
    case 'proceedToExpenseReport':
      return { ...state, step: 'EXPENSE_REPORT' }
    case 'resetState':
      return { ...defaultState, step: 'PERSONAL_DETAILS' }
    default:
      throw new Error()
  }
}
