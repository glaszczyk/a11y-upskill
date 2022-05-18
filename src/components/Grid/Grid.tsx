import classnames from 'classnames'
import styles from './Grid.module.scss'

type GridPropTypes = {
  children: JSX.Element | JSX.Element[]
  gap: 'none' | 'big'
  direction?: 'row' | 'column'
}

export const Grid = ({ children, gap, direction = 'row' }: GridPropTypes) => {
  const className = classnames([styles.grid, styles[`gap-${gap}`]])
  const style = { flexDirection: direction }
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
