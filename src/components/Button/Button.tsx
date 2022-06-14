import React from 'react'
import styles from './Button.module.scss'
import classnames from 'classnames'

type ButtonPropTypes = {
  children: React.ReactNode | React.ReactNode[]
  variant: 'primary' | 'secondary' | 'icon' | 'link-like'
  disabled?: boolean
  className?: string
  onClick: () => void
}

export const Button = ({
  children,
  variant,
  onClick,
  className,
  disabled = false,
}: ButtonPropTypes) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onClick()
  }
  const classNames = classnames(styles[`${variant}-button`], className)
  return (
    <button disabled={disabled} className={classNames} onClick={handleClick}>
      {children}
    </button>
  )
}
