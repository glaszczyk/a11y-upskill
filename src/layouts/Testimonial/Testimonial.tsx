import React from 'react'

import styles from './Testimonial.module.scss'

type SlidePropTypes = {
  backgroundImage: {
    url: string
    position?: string
  }
  children: React.ReactNode | React.ReactNode[]
  label?: string
}

export const Testimonial = ({
  backgroundImage,
  children,
  label,
}: SlidePropTypes) => {
  const style = {
    backgroundImage: `url(${backgroundImage.url})`,
    backgroundPosition: backgroundImage.position
      ? backgroundImage.position
      : 'center center',
  }

  return label ? (
    <section className={styles.slide} style={style} aria-label={label}>
      <div className={styles.container}>{children}</div>
    </section>
  ) : (
    <div className={styles.slide} style={style}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
