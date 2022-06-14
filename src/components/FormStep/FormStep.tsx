import styles from './FormStep.module.scss'
import classnames from 'classnames'

import { ReportStep } from '../../layouts/IncidentReport/types'
import { StepConfig } from '../../layouts/IncidentReport'

type FormStepPropTypes = {
  step: ReportStep
  labels: StepConfig
}

export const FormStep = ({ step, labels }: FormStepPropTypes) => {
  return (
    <ol className={styles.steps}>
      {labels.map((label, index) => {
        const className = classnames(
          styles.step,
          label.step === step ? `${styles.active}` : ''
        )
        return (
          <li
            key={`form-step-${index}`}
            className={className}
            id={label.labelId}
          >
            {`Step ${index + 1} - ${label.name}`}
          </li>
        )
      })}
    </ol>
  )
}
