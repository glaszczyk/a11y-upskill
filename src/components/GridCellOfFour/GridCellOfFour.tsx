import classnames from 'classnames'
import styles from './GridCellOfFour.module.scss'

type GridCellProps = {
  responsive: boolean
  justify?: 'spaceBetween' | 'start'
  direction?: 'row' | 'column'
}

type GridCellPropTypes = GridCellProps & {
  children: JSX.Element | JSX.Element[]
}
export const GridCellOfFour = ({
  children,
  responsive,
  justify = 'start',
  direction = 'column',
}: GridCellPropTypes): JSX.Element => {
  const className = classnames(
    responsive
      ? `${styles.gridCellOfFourResponsive}`
      : `${styles.gridCellOfFourFixed}`,
    styles[`justify-${justify}`],
    styles[`direction-${direction}`]
  )
  return <div className={className}>{children}</div>
}
