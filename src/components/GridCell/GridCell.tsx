import classnames from 'classnames'
import styles from './GridCell.module.scss'

type GridCellProps = {
  responsive: boolean
  justify?: 'space-between' | 'start' | 'center'
  direction?: 'row' | 'column'
}

type GridCellPropTypes = GridCellProps & {
  children: JSX.Element | JSX.Element[]
}
export const GridCell = ({
  children,
  responsive,
  justify = 'start',
  direction = 'column',
}: GridCellPropTypes): JSX.Element => {
  const className = classnames(
    responsive ? `${styles.gridCellResponsive}` : `${styles.gridCellFixed}`,
    styles[`justify-${justify}`],
    styles[`direction-${direction}`]
  )
  const style = { justifyContent: justify }
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
