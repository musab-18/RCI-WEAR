import { useState } from 'react'
import styles from './Portfolio.module.css'

const filters = ['All', 'Hoodies', 'Tees and Essential Shorts', 'Tracksuits', 'Gymwear']

const items = [
  { id: 1, cat: 'Hoodies', title: 'Dead Snake Custom', desc: 'Black hoodie with red serpent graphic', img: '/portfolio/IMG_5442.PNG' },
  { id: 2, cat: 'Hoodies', title: 'Forever Havin Motion', desc: 'Heavyweight black hoodie with white puff print', img: '/portfolio/IMG_5441.PNG' },
  { id: 3, cat: 'Hoodies', title: 'Jetlag Studios Signature', desc: 'Two-tone sleeve lettering with chest logo', img: '/portfolio/IMG_5440.PNG' },
  { id: 4, cat: 'Hoodies', title: 'Dark Root Minimal', desc: 'Subtle gray root graphic on pure black', img: '/portfolio/IMG_5443.PNG' },
  { id: 5, cat: 'Hoodies', title: 'Neon Benji 21', desc: 'Bright green hoodie with patches & print', img: '/portfolio/IMG_5444.PNG' },
  { id: 6, cat: 'Hoodies', title: 'Premium Edition', desc: 'Custom crafted detailing', img: '/portfolio/IMG_5445.PNG' },
  { id: 7, cat: 'Hoodies', title: 'Classic Heavyweight', desc: 'High-quality cotton construction', img: '/portfolio/IMG_5446.PNG' },
  { id: 8, cat: 'Hoodies', title: 'Signature Drop', desc: 'Exclusive release garment', img: '/portfolio/IMG_5447.PNG' },
  { id: 9, cat: 'Tees and Essential Shorts', title: 'First 48 Crimson Set', desc: 'Red motion matching short set', img: '/portfolio/IMG_5454.PNG' },
  { id: 10, cat: 'Tees and Essential Shorts', title: 'Plain White Heavyweight', desc: 'Premium cotton construction tee', img: '/portfolio/IMG_5449.PNG' },
  { id: 11, cat: 'Tees and Essential Shorts', title: 'Broken Tears Graphic', desc: 'Raven puff print back design', img: '/portfolio/IMG_5450.PNG' },
  { id: 12, cat: 'Tees and Essential Shorts', title: 'First 48 Midnight Set', desc: 'Black motion matching short set', img: '/portfolio/IMG_5453.PNG' },
  { id: 13, cat: 'Tees and Essential Shorts', title: 'First 48 Snow Set', desc: 'White motion matching short set', img: '/portfolio/IMG_5455.PNG' },
  { id: 14, cat: 'Tees and Essential Shorts', title: 'Essential Core Tee', desc: 'Minimalist street styling', img: '/portfolio/IMG_5448.PNG' },
  { id: 15, cat: 'Tees and Essential Shorts', title: 'Lounge Comfort Set', desc: 'Premium relaxation fit', img: '/portfolio/IMG_5451.PNG' },
  { id: 16, cat: 'Tees and Essential Shorts', title: 'Signature Athletic Gear', desc: 'High motion mobility set', img: '/portfolio/IMG_5452.PNG' },
  { id: 17, cat: 'Tracksuits', title: 'Pain 2 Champain Noir', desc: 'Black heavyweight tracksuit matching set', img: '/portfolio/IMG_5456.PNG' },
  { id: 18, cat: 'Tracksuits', title: 'Money Crazy Noir', desc: 'Full zip black tracksuit with patches', img: '/portfolio/IMG_5457.PNG' },
  { id: 19, cat: 'Tracksuits', title: 'Noir Tracksuit Profile', desc: 'Form-fitting custom black activewear', img: '/portfolio/IMG_5458.PNG' },
  { id: 20, cat: 'Tracksuits', title: 'Noir Back Graphic', desc: 'Bold back print on premium fleece', img: '/portfolio/IMG_5459.PNG' },
  { id: 21, cat: 'Tracksuits', title: 'Pain 2 Champain Ash', desc: 'Gray heavyweight tracksuit with embroidery', img: '/portfolio/IMG_5460.PNG' },
  { id: 22, cat: 'Tracksuits', title: 'Ash Back Graphic', desc: 'Signature back motif on premium heather', img: '/portfolio/IMG_5461.PNG' },
  { id: 23, cat: 'Gymwear', title: 'Core Logo Singlet Stack', desc: 'Red and black high-performance gym wear', img: '/portfolio/IMG_5462.PNG' },
  { id: 24, cat: 'Gymwear', title: 'Signature Training Top', desc: 'Sleek black B-logo performance singlet', img: '/portfolio/IMG_5463.jpg' },
  { id: 25, cat: 'Gymwear', title: 'Crimson Training Top', desc: 'Bold red B-logo performance singlet', img: '/portfolio/IMG_5464.jpg' },
]

export default function Portfolio() {
  const [active, setActive] = useState('All')

  let filtered = [];
  if (active === 'All') {
    const categories = filters.filter(f => f !== 'All');
    categories.forEach(cat => {
      const catItems = items.filter(i => i.cat === cat);
      const limit = cat === 'Gymwear' ? 1 : 3;
      filtered = [...filtered, ...catItems.slice(0, limit)];
    });
  } else {
    filtered = items.filter(i => i.cat === active);
  }

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
          {filters.map(f => {
            const count = f === 'All' ? items.length : items.filter(i => i.cat === f).length;
            if (f !== 'All' && count === 0) return null;
            return (
              <button
                key={f}
                className={`${styles.filter} ${active === f ? styles.active : ''}`}
                onClick={() => setActive(f)}
              >
                {f} <span style={{ opacity: 0.6, fontSize: '0.9em', marginLeft: '4px' }}>({count})</span>
              </button>
            )
          })}
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
