import Link from 'next/link'

import { Logo } from '../../components/Button/Logo'

import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.imageContainer}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <div className={styles.menuContainer}>
        <div aria-labelledby="about-us" className={styles.menu}>
          <h2 className={styles.menuGroupTitle} id="about-us">
            About us
          </h2>
          <ol className={styles.menuGroup}>
            <li className={styles.menuItem}>
              <Link href="/newsroom">
                <a rel="noopener noreferrer">Newsroom</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/careers">
                <a rel="noopener noreferrer">Careers</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/our-story">
                <a rel="noopener noreferrer">Our story</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/customer-stories">
                <a rel="noopener noreferrer">Customer Stories</a>
              </Link>
            </li>
          </ol>
        </div>
        <div className={styles.menu} aria-labelledby="products">
          <h2 className={styles.menuGroupTitle} id="products">
            Products
          </h2>
          <ol className={styles.menuGroup}>
            <li className={styles.menuItem}>
              <Link href="/vacation-holiday">
                <a rel="noopener noreferrer">Vacation / Holiday</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/student-scholar">
                <a rel="noopener noreferrer">Student / Scholar</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/mission">
                <a rel="noopener noreferrer">Mission</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/marine-captain-crew">
                <a rel="noopener noreferrer">
                  Marine Captain /<br /> Crew
                </a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/employer-business-traveler">
                <a rel="noopener noreferrer">
                  Employer /<br /> Business Traveler
                </a>
              </Link>
            </li>
          </ol>
        </div>
        <div className={styles.menu} aria-labelledby="members">
          <h2 className={styles.menuGroupTitle} id="members">
            Members
          </h2>
          <ol className={styles.menuGroup}>
            <li className={styles.menuItem}>
              <Link href="/forms-library">
                <a rel="noopener noreferrer">Forms Library</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/find-a-doctor">
                <a rel="noopener noreferrer">Find a Doctor</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/renew-policy">
                <a rel="noopener noreferrer">Renew Policy</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/claims-center">
                <a rel="noopener noreferrer">Claims Center</a>
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </footer>
  )
}
