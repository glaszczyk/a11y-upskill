import React from 'react'
import styles from './Button.module.scss'
import classnames from 'classnames'

type ButtonPropTypes = {
  children: React.ReactNode | React.ReactNode[]
  variant: 'primary' | 'secondary'
  className?: string
  onClick: () => void
}

export const Button = ({
  children,
  variant,
  onClick,
  className,
}: ButtonPropTypes) => {
  const classNames = classnames(styles[variant], className)
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  )
}
