import styles from './Blogpost.module.scss'
import Image from 'next/image'
import Link from 'next/link'

type GridPropTypes = {
  title: string
  imageSrc: string
  href: string
}

export const Blogpost = ({ title, imageSrc, href }: GridPropTypes) => {
  return (
    <section className={styles.blogpost}>
      <div className={styles.image}>
        <Image src={imageSrc} width={600} height={400} alt="" />
      </div>
      <h3>
        <Link href={href}>{title}</Link>
      </h3>
    </section>
  )
}
