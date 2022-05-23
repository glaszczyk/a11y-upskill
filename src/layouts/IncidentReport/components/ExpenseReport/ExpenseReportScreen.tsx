import styles from './ExpenseReportScreen.module.scss'

export const ExpenseReportScreen = () => {
  return (
    <form className={styles.report}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" type="text" onChange={(e) => null} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" type="text" onChange={(e) => null} />
      </div>
    </form>
  )
}
