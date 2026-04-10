import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <button className={styles.brand} onClick={() => handleNav('#home')}>
          <div className={styles.logoBox}>
            <img src="/logo.jpg" alt="Rasheed Clothing International Logo" className={styles.logoImg} id="navbar-logo" />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Rasheed Clothing</span>
            <span className={styles.brandSub}>International</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map(l => (
            <button key={l.label} className={styles.navLink} onClick={() => handleNav(l.href)}>
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button className={`btn-primary ${styles.cta}`} onClick={() => handleNav('#contact')}>
          Get In Touch
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map(l => (
          <button key={l.label} className={styles.mobileLink} onClick={() => handleNav(l.href)}>
            {l.label}
          </button>
        ))}
        <button className="btn-primary" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }} onClick={() => handleNav('#contact')}>
          Get In Touch
        </button>
      </div>
    </header>
  )
}
