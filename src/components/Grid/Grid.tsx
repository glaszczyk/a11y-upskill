import classnames from 'classnames'
import styles from './Grid.module.scss'
import React from 'react'

type GridPropTypes = {
  children: JSX.Element | JSX.Element[]
  gap: 'none' | 'big'
  direction?: 'row' | 'column'
  labelledBy?: string
}

export const Grid = ({
  children,
  gap,
  direction = 'row',
  labelledBy,
}: GridPropTypes) => {
  const className = classnames([styles.grid, styles[`gap-${gap}`]])
  const style = { flexDirection: direction }
  return labelledBy ? (
    <section className={className} style={style} aria-labelledby={labelledBy}>
      {children}
    </section>
  ) : (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
