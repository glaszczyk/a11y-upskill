import type { NextPage } from 'next'
import Image from 'next/image'
import Logo from '/public/sample-logo.svg'

import { Navbar } from '../layouts/Navbar'
import { Footer } from '../layouts/Footer'
import { Main } from '../layouts/Main'
import { PageContainer } from '../components/PageContainer'
import { Slide } from '../layouts/Slide'
import { Button } from '../components/Button'
import { Grid } from '../components/Grid'
import { GridCell } from '../components/GridCell'
import { Testimonial } from '../layouts/Testimonial'
import styles from '../layouts/Navbar/Navbar.module.scss'
import { GridCellOfFour } from '../components/GridCellOfFour'
import { Blogpost } from '../components/Blogpost'
import Link from 'next/link'
import slideStyles from '/src/layouts/Slide/Slide.module.scss'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <Slide
          labelledBy="travel-title"
          backgroundImage={{
            url: '/jakob-owens-MctEgCk1Dm0-unsplash.jpg',
            position: 'center bottom',
          }}
        >
          <h1 id="travel-title" className={slideStyles.slideTitle}>
            Travel Insurance
          </h1>
          <p className={slideStyles.slideBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Button variant="primary" onClick={() => null}>
            Order Now
          </Button>
        </Slide>
        <Grid gap="big" labelledBy="insurance-for-international-visitors">
          <GridCell responsive>
            <Image src="/emergency.jpg" width={1200} height={800} alt="" />
          </GridCell>
          <GridCell responsive>
            <h2 id="insurance-for-international-visitors">
              Insurance for International Visitors
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ol>
              <li>List item #1</li>
              <li>List item #2</li>
              <li>List item #2</li>
            </ol>
          </GridCell>
        </Grid>
        <Grid gap="big" labelledBy="safe-travels">
          <GridCell responsive>
            <h2 id="safe-travels">Safe Travels</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </GridCell>
          <GridCell responsive>
            <Image src="/fly.jpg" width={1200} height={800} alt="" />
          </GridCell>
        </Grid>
        <Grid
          gap="big"
          direction="column"
          labelledBy="explore-our-travel-topics"
        >
          <GridCell responsive={false} justify="center" direction="row">
            <h2 id="explore-our-travel-topics">Explore Our Travel Topics</h2>
          </GridCell>
          <GridCellOfFour responsive direction="row">
            <Blogpost
              title="Renting Vacation Homes"
              imageSrc="/desert1.jpg"
              href="/renting-vacation-homes"
            />
            <Blogpost
              title="Popular Travel Destinations for 2021"
              imageSrc="/desert2.jpg"
              href="/popular-travel-destinations-2021"
            />
            <Blogpost
              title="Trends & Predictions"
              imageSrc="/airport1.jpg"
              href="/trends-predictions"
            />
            <Blogpost
              title="Travel Gear for Safe Travels in 2021"
              imageSrc="/airport2.jpg"
              href="/travel-gear-2021"
            />
          </GridCellOfFour>
        </Grid>
        <Testimonial
          backgroundImage={{
            url: '/testimonial-background.jpg',
            position: 'center center',
          }}
          label="testimonials"
        >
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </h2>
          <Image
            src={Logo}
            className={styles.logo}
            alt="Return to main page"
            width={200}
            height={43}
          />
          <p>Donald Duck, CEO of Disney</p>
        </Testimonial>
        <Grid gap="big" labelledBy="are-you-looking-for-an-insurance">
          <GridCell responsive>
            <h2 id="are-you-looking-for-an-insurance">
              Are you looking for an insurance?
            </h2>
            <p>Contact us to order</p>
          </GridCell>
          <GridCell responsive justify="space-between" direction="row">
            <p className={styles.buttonLikeLinkSecondary}>
              <Link href="/contact">Send a message</Link>
            </p>
            <p className={styles.buttonLikeLinkPrimary}>
              <Link href="/contact">Call Us</Link>
            </p>
          </GridCell>
        </Grid>
      </Main>
      <Footer />
    </PageContainer>
  )
}

export default Home
