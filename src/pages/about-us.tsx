import type { NextPage } from 'next'

import { Navbar } from '../layouts/Navbar/Navbar'
import { Footer } from '../layouts/Footer/Footer'
import { Main } from '../layouts/Main/Main'
import { PageContainer } from '../components/PageContainer/PageContainer'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <h1>About us</h1>
      </Main>
      <Footer />
    </PageContainer>
  )
}

export default Home
