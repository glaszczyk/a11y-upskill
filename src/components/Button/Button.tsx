import React from 'react'
import styles from './Button.module.scss'

type ButtonPropTypes = {
  children: React.ReactNode | React.ReactNode[]
  variant: 'primary' | 'secondary'
}

export const Button = ({ children, variant }: ButtonPropTypes) => {
  return <button className={styles[variant]}>{children}</button>
}
