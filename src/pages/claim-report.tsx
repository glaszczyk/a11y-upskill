import type { NextPage } from 'next'

import { Navbar } from '../layouts/Navbar'
import { Footer } from '../layouts/Footer'
import { Main } from '../layouts/Main'
import { PageContainer } from '../components/PageContainer'
import { IncidentReport } from '../layouts/IncidentReport'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <h1>Claim report</h1>
        <IncidentReport />
      </Main>
      <Footer />
    </PageContainer>
  )
}

export default Home
