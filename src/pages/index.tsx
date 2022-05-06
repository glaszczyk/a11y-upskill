import type { NextPage } from 'next'

import { Test } from '../components/Test/Test'
import { Navbar } from '../layouts/Navbar/Navbar'
import { Footer } from '../layouts/Footer/Footer'
import { Main } from '../layouts/Main/Main'
import { PageContainer } from '../components/PageContainer/PageContainer'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <Test />
      </Main>
      <Footer />
    </PageContainer>
  )
}

export default Home
