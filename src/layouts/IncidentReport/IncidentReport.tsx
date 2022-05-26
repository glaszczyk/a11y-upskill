import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './IncidentReport.module.scss'
import { ReportState, ReportStep } from './types'
import { PersonalDetailsScreen } from './components/PersonalDetailsScreen'
import { IncidentDetailsScreen } from './components/IncidentDetails'
import { ExpenseReportScreen } from './components/ExpenseReport'
import { incidentReportReducer } from './incidentReportReducer'
import { FormStep } from '../../components/FormStep'

const defaultState: ReportState = {
  step: 'PERSONAL_DETAILS',
  personalDetails: {
    firstName: '',
    secondName: '',
    birthday: '',
    email: '',
    phone: '',
    policyNo: '',
  },
  incidentDetails: {
    country: '',
    incidentDescription: '',
    address: '',
    date: '',
    travelPurpose: 'tourism',
  },
  expenseReport: [
    { id: uuidv4(), cost: '$30', description: 'expense no 1' },
    { id: uuidv4(), cost: '$60', description: 'expense no 2' },
  ],
}
export const IncidentReportContext = React.createContext<{
  state: ReportState
  dispatch: React.Dispatch<any>
}>({
  state: { ...defaultState },
  dispatch: () => null,
})

export type StepConfigItem = { step: ReportStep; labelId: string; name: string }
export type StepConfig = StepConfigItem[]

const stepConfigurator: StepConfig = [
  {
    step: 'PERSONAL_DETAILS',
    labelId: 'step_personal_details',
    name: 'Personal Details',
  },
  {
    step: 'INCIDENT_DETAILS',
    labelId: 'step_incident_details',
    name: 'Incident Details',
  },
  {
    step: 'EXPENSE_REPORT',
    labelId: 'step_expense_record',
    name: 'Expense Report',
  },
]

const getStepLabel = (step: ReportStep) =>
  stepConfigurator.filter((element) => element.step === step)[0]

export const IncidentReport = () => {
  const [state, dispatch] = useReducer(incidentReportReducer, defaultState)

  const getReportPage = (state: ReportState) => {
    switch (state.step) {
      case 'PERSONAL_DETAILS': {
        return <PersonalDetailsScreen labelledBy={getStepLabel(state.step)} />
      }
      case 'INCIDENT_DETAILS': {
        return <IncidentDetailsScreen labelledBy={getStepLabel(state.step)} />
      }
      case 'EXPENSE_REPORT': {
        return <ExpenseReportScreen labelledBy={getStepLabel(state.step)} />
      }
    }
  }

  return (
    <IncidentReportContext.Provider value={{ state, dispatch }}>
      <FormStep step={state.step} labels={stepConfigurator} />
      <form className={styles.report}>{getReportPage(state)}</form>
    </IncidentReportContext.Provider>
  )
}
