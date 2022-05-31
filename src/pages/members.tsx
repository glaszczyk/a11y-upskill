import type { NextPage } from 'next'

import { Navbar } from '../layouts/Navbar'
import { Footer } from '../layouts/Footer'
import { Main } from '../layouts/Main'
import { PageContainer } from '../components/PageContainer'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <h1>Members</h1>
      </Main>
      <Footer />
    </PageContainer>
  )
}

export default Home