import Image from 'next/image'

import styles from './Navbar.module.scss'
import Logo from '../../../public/TheInsurerLogo.svg'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <a>
          <Image
            src={Logo}
            className={styles.logo}
            alt="Return to main page"
            width={200}
            height={43}
          />
        </a>
      </Link>
      <ul className={styles.menu} role="menubar">
        <li role="menuitem" className={styles.menuItem}>
          <Link href="/insurance">
            <a>Insurance</a>
          </Link>
        </li>
        <li role="menuitem" className={styles.menuItem}>
          <Link href="/about-us">
            <a>About us</a>
          </Link>
        </li>
        <li role="menuitem" className={styles.menuItem}>
          <Link href="/claim-report">
            <a>Claim report</a>
          </Link>
        </li>
        <li role="menuitem" className={styles.menuItem}>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
