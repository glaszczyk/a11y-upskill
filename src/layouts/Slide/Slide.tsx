import styles from './Slide.module.scss'
import React from 'react'

type SlidePropTypes = {
  backgroundImage: {
    url: string
    position?: string
  }
  children: React.ReactNode | React.ReactNode[]
  labelledBy?: string
}

export const Slide = ({
  backgroundImage,
  children,
  labelledBy,
}: SlidePropTypes) => {
  const style = {
    backgroundImage: `url(${backgroundImage.url})`,
    backgroundPosition: backgroundImage.position
      ? backgroundImage.position
      : 'center center',
  }

  return labelledBy ? (
    <section
      className={styles.slide}
      style={style}
      aria-labelledby={labelledBy}
    >
      <div className={styles.container}>{children}</div>
    </section>
  ) : (
    <div className={styles.slide} style={style}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
