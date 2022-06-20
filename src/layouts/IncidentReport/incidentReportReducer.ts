import {
  Expense,
  Expenses,
  IncidentDetailsDispatchAction,
  IncidentDetailsKeys,
  PersonalDetailsDispatchAction,
  PersonalDetailsKeys,
  ReportDispatchAction,
  ReportState,
} from './types'
import { v4 as uuidv4 } from 'uuid'

export const defaultState: ReportState = {
  step: 'PERSONAL_DETAILS',
  personalDetails: {
    firstName: { key: 'firstName', value: '', error: '', required: true },
    secondName: { key: 'secondName', value: '', error: '', required: true },
    birthday: {
      key: 'birthday',
      value: '',
      error: '',
      required: true,
    },
    email: { key: 'email', value: '', error: '', required: true },
    phone: { key: 'phone', value: '', error: '', required: true },
    policyNo: { key: 'policyNo', value: '', error: '', required: true },
  },
  incidentDetails: {
    country: { key: 'country', value: '', error: '', required: true },
    incidentDescription: {
      key: 'incidentDescription',
      value: '',
      error: '',
      required: false,
    },
    address: { key: 'address', value: '', error: '', required: false },
    date: { key: 'date', value: '', error: '', required: true },
    travelPurpose: {
      key: 'travelPurpose',
      value: 'tourism',
      error: '',
      required: false,
    },
  },
  expenseReport: [
    {
      id: uuidv4(),
      cost: { key: 'cost', value: '30', error: '', required: true },
      description: {
        key: 'description',
        value: 'expense no 1',
        required: true,
      },
    },
    {
      id: uuidv4(),
      cost: { key: 'cost', value: '60', error: '', required: true },
      description: {
        key: 'description',
        value: 'expense no 2',
        required: true,
      },
    },
  ],
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
const changePersonalDetails = (
  state: ReportState,
  { payload }: PersonalDetailsDispatchAction
): ReportState => {
  const { personalDetails } = state
  const key: PersonalDetailsKeys = payload?.key || 'firstName'
  const updatedPersonalDetails = {
    ...personalDetails,
    [key]: { ...payload },
  }
  return {
    ...state,
    personalDetails: { ...updatedPersonalDetails },
  }
}

const changeIncidentDetails = (
  state: ReportState,
  { payload }: IncidentDetailsDispatchAction
): ReportState => {
  const { incidentDetails } = state
  const key: IncidentDetailsKeys = payload?.key || 'travelPurpose'
  const updatedIncidentDetails = {
    ...incidentDetails,
    [key]: payload,
  }
  return {
    ...state,
    incidentDetails: { ...updatedIncidentDetails },
  }
}

const setRequiredPersonalDetailsEmpty = (
  state: ReportState,
  { payload }: PersonalDetailsDispatchAction
): ReportState => {
  const { personalDetails } = state
  const key: PersonalDetailsKeys = payload?.key || 'firstName'
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

const setRequiredIncidentDetailsEmpty = (
  state: ReportState,
  { payload }: IncidentDetailsDispatchAction
): ReportState => {
  const { incidentDetails } = state
  const key: IncidentDetailsKeys = payload?.key || 'travelPurpose'
  const updatedIncidentDetails = {
    ...incidentDetails,
    [key]: {
      ...incidentDetails[key],
      error: 'Required field cannot be empty',
    },
  }
  return {
    ...state,
    incidentDetails: { ...updatedIncidentDetails },
  }
}

export const incidentReportReducer = (
  state: ReportState,
  action: ReportDispatchAction
): ReportState => {
  switch (action.type) {
    case 'setRequiredPersonalDetailsEmpty':
      return setRequiredPersonalDetailsEmpty(state, action)
    case 'changePersonalDetails':
      return changePersonalDetails(state, action)
    case 'setRequiredIncidentDetailsEmpty':
      return setRequiredIncidentDetailsEmpty(state, action)
    case 'changeIncidentDetails':
      return changeIncidentDetails(state, action)
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
