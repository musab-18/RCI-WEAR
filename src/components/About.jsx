import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const values = [
  {
    icon: '✦',
    title: 'Premium Quality',
    desc: 'Only the finest fabrics and materials make it into our creations. Every piece is a testament to excellence.',
  },
  {
    icon: '✧',
    title: 'Master Craftsmanship',
    desc: 'Decades of skill passed through generations. Every stitch tells a story of dedication and artistry.',
  },
  {
    icon: '◈',
    title: 'Custom Designs',
    desc: 'Your vision brought to life. We tailor each garment to your unique style, measurements, and preferences.',
  },
  {
    icon: '⬡',
    title: 'Timely Delivery',
    desc: 'We respect your time. Our efficient production ensures your orders are delivered as promised, every time.',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle(styles.visible, e.isIntersecting)),
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className={`section ${styles.about}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {/* Image / Brand visual */}
          <div className={styles.visual}>
            <div className={styles.imageOuter}>
              <div className={styles.imageInner} id="about-image-area">
                <img src="/about_img.jpg" alt="Rasheed Clothing International" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className={styles.accentBox}>
                <span className={styles.accentYear}>Since</span>
                <span className={styles.accentNum}>2017</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={styles.text}>
            <p className="section-label">Our Story</p>
            <h2 className="section-title">
              Crafting Dreams Into <span className="gold-text">Reality</span>
            </h2>
            <div className="divider" />
            <p className={styles.body}>
              Rasheed Clothing International was born from a passion for fashion and a relentless
              pursuit of quality. With roots in the rich textile heritage of Pakistan, we blend
              traditional craftsmanship with contemporary design sensibilities.
            </p>
            <p className={styles.body} style={{ marginTop: '16px' }}>
              Whether it's a bespoke bridal ensemble, corporate uniforms, or a full ready-to-wear
              collection, every garment that leaves our atelier is a work of art—designed to make
              you feel extraordinary.
            </p>

            <div className={styles.values}>
              {values.map((v, i) => (
                <div key={i} className={styles.valueCard} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <div>
                    <h4 className={styles.valueTitle}>{v.title}</h4>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
