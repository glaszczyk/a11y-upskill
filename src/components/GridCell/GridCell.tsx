import styles from './GridCell.module.scss'

type WidthInPercents = 50 | 100

type GridCellProps = {
  responsive: boolean
}

type GridCellPropTypes = GridCellProps & {
  children: JSX.Element | JSX.Element[]
}
export const GridCell = ({
  children,
  responsive,
}: GridCellPropTypes): JSX.Element => {
  const className = responsive
    ? `${styles.gridCellResponsive}`
    : `${styles.gridCellFixed}`
  return <div className={className}>{children}</div>
}
