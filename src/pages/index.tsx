import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { Test } from '../components/Test/Test'
import { Navbar } from '../layouts/Navbar/Navbar'
import { Footer } from '../layouts/Footer/Footer'
import { Main } from '../layouts/Main/Main'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Insurer. Travel insurance company</title>
        <meta name="description" content="Services for travel agencies" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <Navbar />

      <Main>
        <Test />
      </Main>

      <Footer />
    </div>
  )
}

export default Home
