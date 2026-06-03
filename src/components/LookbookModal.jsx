import { useEffect } from 'react'
import styles from './LookbookModal.module.css'

export default function LookbookModal({ item, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!item) return null

  const handleInquire = () => {
    onClose()
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} data-cursor-text="CLOSE">
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal" data-cursor>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.imageSide}>
          <img src={item.img} alt={item.title} className={styles.image} />
          {item.badge && <span className={styles.badge}>{item.badge}</span>}
        </div>

        <div className={styles.infoSide}>
          <span className={styles.cat}>{item.cat}</span>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.desc}>
            {item.desc}. This premium garment is crafted with meticulous attention to detail. Designed for comfort, durability, and a striking silhouette.
          </p>
          <button className={styles.inquireBtn} onClick={handleInquire} data-cursor>
            Inquire About This Piece
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}
