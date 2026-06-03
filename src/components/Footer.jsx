import styles from './Footer.module.css'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const nav = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className={styles.topDivider} />
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={`${styles.brand} reveal`}>
            <div className={styles.logoRow}>
              <div className={styles.logoCircle}>
                <img src="/logo.jpg" alt="Rasheed Clothing International" className={styles.logoImg} />
              </div>
              <div className={styles.brandNameWrap}>
                <span className={styles.brandName}>Rasheed Clothing</span>
                <span className={styles.brandSub}>International</span>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Where Imagination Meets Fabrication. Crafting premium garments with passion, precision, and unmatched artisanship since 2017.
            </p>
            <p className={styles.slogan}>" Where Imagination Meets Fabrication "</p>
          </div>

          {/* Nav */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.navList}>
              {links.map(l => (
                <li key={l.label}>
                  <button className={styles.navLink} onClick={() => nav(l.href)}>{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <div className={styles.contactList}>
              <a href="mailto:rasheedclothingintl@gmail.com" className={styles.contactLink}>
                <span className={styles.contactIcon}>✉</span>
                rasheedclothingintl@gmail.com
              </a>
              <a href="tel:+923496014611" className={styles.contactLink}>
                <span className={styles.contactIcon}>☎</span>
                +92 349 601 4611
              </a>
              <p className={styles.contactLink}>
                <span className={styles.contactIcon}>⏰</span>
                Mon–Sat: 9:00 AM – 7:00 PM
              </p>
            </div>

            <div style={{ marginTop: '32px' }}>
              <img src="/chamber.png" alt="Sialkot Chamber of Commerce & Industry" style={{ height: '42px', objectFit: 'contain', opacity: 0.95, backgroundColor: 'white', padding: '6px 12px', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Rasheed Clothing International. All Rights Reserved.
          </p>
          <div className={styles.madeContainer}>
            <p className={styles.made}>
              Developed by <span className={styles.developer}>Musab Iftikhar</span>
            </p>
            <a href="mailto:musabiftikhar44@gmail.com" className={styles.madeEmail} data-cursor>
              musabiftikhar44@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
