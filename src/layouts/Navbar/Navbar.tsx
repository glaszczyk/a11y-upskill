import styles from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <p className={styles.logo}>Logo</p>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>Insurance</li>
        <li className={styles.menuItem}>About us</li>
        <li className={styles.menuItem}>Claim report</li>
        <li className={styles.menuItem}>Contact</li>
      </ul>
    </nav>
  )
}
