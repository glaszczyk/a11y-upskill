import styles from './Slide.module.scss'
import React from 'react'

type SlidePropTypes = {
  backgroundImage: {
    url: string
    position?: string
  }
  children: React.ReactNode | React.ReactNode[]
}

export const Slide = ({ backgroundImage, children }: SlidePropTypes) => {
  const style = {
    backgroundImage: `url(${backgroundImage.url})`,
    backgroundPosition: backgroundImage.position
      ? backgroundImage.position
      : 'center center',
  }

  return (
    <div className={styles.slide} style={style}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
