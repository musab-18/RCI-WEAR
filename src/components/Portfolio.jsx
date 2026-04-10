import { useState } from 'react'
import styles from './Portfolio.module.css'

const filters = ['All', 'Streetwear', 'Casual', 'Kids']

const items = [
  { id: 1, cat: 'Casual', title: 'Street Style Hoodie', desc: 'Custom gray zip-up with embroidered wine glass detail', img: '/portfolio/media__1775818866466.jpg' },
  { id: 2, cat: 'Streetwear', title: 'Jetlag Studios Black', desc: 'Bold lettering on premium black hoodie', img: '/portfolio/media__1775818869472.jpg' },
  { id: 3, cat: 'Kids', title: 'First 48 Set Black', desc: 'Motion matching set for kids', img: '/portfolio/media__1775817925946.jpg' },
  { id: 4, cat: 'Casual', title: 'Keep Swimming Est 2023', desc: 'Premium grey hoodie with embroidered lettering', img: '/portfolio/media__1775818871661.jpg' },
  { id: 5, cat: 'Kids', title: 'First 48 Set Red', desc: 'Red motion matching set for kids', img: '/portfolio/media__1775817922243.jpg' },
  { id: 6, cat: 'Streetwear', title: 'Dead Habit Back', desc: 'Custom graphic printed black hoodie', img: '/portfolio/media__1775818876935.jpg' },
  { id: 7, cat: 'Kids', title: 'First 48 Set White', desc: 'White motion kids set', img: '/portfolio/media__1775817919955.jpg' },
  { id: 8, cat: 'Casual', title: 'Money Crazy Hoodie', desc: 'Black hoodie with intricate sleeve details', img: '/portfolio/media__1775818888792.jpg' },
  { id: 9, cat: 'Streetwear', title: 'Forever Havin Motion', desc: 'White puff print on deep black fabric', img: '/portfolio/media__1775818899078.jpg' },
  { id: 10, cat: 'Casual', title: 'JL Oversized Hoodie', desc: 'Large custom letter patches on back', img: '/portfolio/media__1775818903921.jpg' },
  { id: 11, cat: 'Streetwear', title: 'Keep Swimming Fire', desc: 'Protect Your Inner G dark streetwear edit', img: '/portfolio/media__1775818906555.jpg' },
  { id: 12, cat: 'Casual', title: 'Pain 2 Champain Grey', desc: 'Matching grey sweatsuit with embroidery', img: '/portfolio/media__1775818909849.jpg' },
  { id: 13, cat: 'Casual', title: 'Pain 2 Champain Black', desc: 'Matching black sweatsuit with detail', img: '/portfolio/media__1775818901616.jpg' },
  { id: 14, cat: 'Streetwear', title: 'Double Pack', desc: 'Standing duo in grey and black sets', img: '/portfolio/media__1775817915164.jpg' },
  { id: 15, cat: 'Streetwear', title: 'Casual Hoodie Side Profile', desc: 'Premium hooded styling', img: '/portfolio/media__1775817917761.jpg' },
]

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? items : items.filter(i => i.cat === active)

  return (
    <section id="portfolio" className={`section ${styles.portfolio}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Our Work</p>
          <h2 className="section-title">
            Portfolio <span className="gold-text">Gallery</span>
          </h2>
          <p className={styles.subtitle}>
            A glimpse into our finest creations. Real products, real motion, uncompromised quality.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filters}>
          {filters.map(f => (
            <button
              key={f}
              className={`${styles.filter} ${active === f ? styles.active : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={styles.item}
              style={{ animationDelay: `${i * 0.07}s` }}
              id={`portfolio-item-${item.id}`}
            >
              {/* Image placeholder */}
              <div className={styles.itemImg}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div className={styles.itemOverlay}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemDesc}>{item.desc}</p>
                  <span className={styles.itemCat}>{item.cat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.uploadNote}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          These are authentic Rasheed Clothing International products. Reach out to get yours started.
        </div>
      </div>
    </section>
  )
}
