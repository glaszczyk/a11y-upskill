import Head from 'next/head'

import styles from './PageContainer.module.scss'

type PageContainerProps = {
  children: JSX.Element | JSX.Element[]
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Insurer. Travel insurance company</title>
        <meta name="description" content="Services for travel agencies" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}
