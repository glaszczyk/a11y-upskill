import styles from './Grid.module.scss'

type GridPropTypes = {
  children: JSX.Element | JSX.Element[]
}

export const Grid = ({ children }: GridPropTypes) => {
  return <div className={styles.grid}>{children}</div>
}
