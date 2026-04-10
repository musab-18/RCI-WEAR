import styles from './Collections.module.css'

const collections = [
  {
    id: 1,
    title: 'Bridal Couture',
    subtitle: 'Timeless Elegance',
    desc: 'Exquisite bridal wear crafted with intricate embroidery and the finest silks.',
    tag: 'Signature',
  },
  {
    id: 2,
    title: 'Formal Wear',
    subtitle: 'Contemporary Class',
    desc: 'Sharp, sophisticated formal collections for every professional occasion.',
    tag: 'Premium',
  },
  {
    id: 3,
    title: 'Traditional',
    subtitle: 'Heritage Craftsmanship',
    desc: 'Celebrating culture through authentic traditional garments with modern sensibility.',
    tag: 'Heritage',
  },
  {
    id: 4,
    title: 'Corporate Uniforms',
    subtitle: 'Brand Excellence',
    desc: 'Custom corporate wear that reflects your brand identity with professionalism.',
    tag: 'Custom',
  },
  {
    id: 5,
    title: 'Casual Luxury',
    subtitle: 'Everyday Prestige',
    desc: 'Effortlessly stylish casualwear for the discerning individual.',
    tag: 'Lifestyle',
  },
  {
    id: 6,
    title: 'Kids Collection',
    subtitle: 'Little Stars',
    desc: 'Adorable, comfortable, and high-quality clothing for the little ones.',
    tag: 'Kids',
  },
]

export default function Collections() {
  return (
    <section id="collections" className={`section ${styles.collections}`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">
              Our <span className="gold-text">Collections</span>
            </h2>
          </div>
          <p className="section-subtitle">
            From bridal grandeur to everyday casual luxury — discover the full spectrum of our craft.
          </p>
        </div>

        <div className={styles.grid}>
          {collections.map((c, i) => (
            <div key={c.id} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
              {/* Image placeholder */}
              <div className={styles.cardImage} id={`collection-img-${c.id}`}>
                <div className={styles.cardImageInner}>
                  <svg viewBox="0 0 60 60" fill="none" width="40" height="40">
                    <rect x="4" y="4" width="52" height="52" rx="3" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3 2"/>
                    <path d="M20 36l10-14 8 10 5-6 7 10H10z" fill="rgba(201,168,76,0.15)" stroke="#c9a84c" strokeWidth="1"/>
                  </svg>
                  <span>Add Image</span>
                </div>
                <div className={styles.cardTag}>{c.tag}</div>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.cardSubtitle}>{c.subtitle}</p>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.desc}</p>
                <button className={styles.cardBtn}>
                  Explore
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
