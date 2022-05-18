import styles from './Blogpost.module.scss'
import Image from 'next/image'

type GridPropTypes = {
  title: string
  imageSrc: string
}

export const Blogpost = ({ title, imageSrc }: GridPropTypes) => {
  return (
    <div className={styles.blogpost}>
      <div className={styles.image}>
        <Image src={imageSrc} width={600} height={400} alt="" />
      </div>
      <h3>{title}</h3>
    </div>
  )
}
