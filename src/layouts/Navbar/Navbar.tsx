import Link from 'next/link'
import { useState } from 'react'
import classnames from 'classnames'

import { Logo } from '../../components/Button/Logo'

import styles from './Navbar.module.scss'

export const Navbar = () => {
  const [menuHidden, setMenuHidden] = useState(true)
  const toggleMenu = () => {
    setMenuHidden(!menuHidden)
  }

  return (
    <header className={styles.container}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav aria-labelledby="main-menu-button" className={styles.navigation}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          id="main-menu-button"
        >
          Main Menu
        </button>
        <ul
          className={classnames(
            styles.menu,
            menuHidden ? styles.mobileHidden : null
          )}
          role="menubar"
        >
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
    </header>
  )
}
