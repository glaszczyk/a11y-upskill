import type { NextPage } from 'next'

import { Test } from '../components/Test'
import { Navbar } from '../layouts/Navbar'
import { Footer } from '../layouts/Footer'
import { Main } from '../layouts/Main'
import { PageContainer } from '../components/PageContainer'
import { Slide } from '../layouts/Slide'
import { Button } from '../components/Button'
import { Grid } from '../components/Grid'
import { GridCell } from '../components/GridCell'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <Slide
          backgroundImage={{
            url: '/jakob-owens-MctEgCk1Dm0-unsplash.jpg',
            position: 'center bottom',
          }}
        >
          <h1>Travel Insurance</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Button variant="primary">Order Now</Button>
        </Slide>
        <Grid>
          <GridCell responsive>
            <p>This is grid element 1</p>
          </GridCell>
          <GridCell responsive>
            <p>This is grid element 2</p>
          </GridCell>
        </Grid>
        <Test />
      </Main>
      <Footer />
    </PageContainer>
  )
}

export default Home
