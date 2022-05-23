import styles from './IncidentReport.module.scss'
import { ReportState } from './types'
import { PersonalDetailsScreen } from './components/PersonalDetailsScreen'
import { IncidentDetailsScreen } from './components/IncidentDetails'
import { ExpenseReportScreen } from './components/ExpenseReport'
import React, { useReducer } from 'react'
import { incidentReportReducer } from './incidentReportReducer'

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
  expenseReport: [],
}

export const IncidentReportContext = React.createContext<{
  state: ReportState
  dispatch: React.Dispatch<any>
}>({
  state: { ...defaultState },
  dispatch: () => null,
})

export const IncidentReport = () => {
  const [state, dispatch] = useReducer(incidentReportReducer, defaultState)

  const getReportPage = (state: ReportState) => {
    switch (state.step) {
      case 'PERSONAL_DETAILS': {
        return <PersonalDetailsScreen />
      }
      case 'INCIDENT_DETAILS': {
        return <IncidentDetailsScreen />
      }
      case 'EXPENSE_REPORT': {
        return <ExpenseReportScreen />
      }
    }
  }

  return (
    <IncidentReportContext.Provider value={{ state, dispatch }}>
      <form className={styles.report}>{getReportPage(state)}</form>
    </IncidentReportContext.Provider>
  )
}
