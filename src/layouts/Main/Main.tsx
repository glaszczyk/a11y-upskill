import styles from './Main.module.scss'

type MainPropTypes = {
  children: JSX.Element | JSX.Element[]
}
export const Main = ({ children }: MainPropTypes) => {
  return <main className={styles.main}>{children}</main>
}
