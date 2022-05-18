import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/TheInsurerLogo.svg'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.imageContainer}>
        <Link href="/">
          <a>
            <Image
              src={Logo}
              className={styles.logo}
              alt=""
              width={200}
              height={43}
            />
          </a>
        </Link>
      </div>
      <div className={styles.menuContainer}>
        <ol className={styles.menu}>
          <li className={styles.menuItem}>
            <Link href="/about-us">
              <a rel="noopener noreferrer">About us</a>
            </Link>
          </li>
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
        <ol className={styles.menu}>
          <li className={styles.menuItem}>
            <Link href="/products">
              <a rel="noopener noreferrer">Products</a>
            </Link>
          </li>
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
        <ol className={styles.menu}>
          <li className={styles.menuItem}>
            <Link href="/members">
              <a rel="noopener noreferrer">Members</a>
            </Link>
          </li>
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
    </footer>
  )
}
