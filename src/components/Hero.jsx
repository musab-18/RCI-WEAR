import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const particlesRef = useRef(null)

  useEffect(() => {
    const canvas = particlesRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedY = -(Math.random() * 0.4 + 0.1)
        this.speedX = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.6 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++
        if (this.life > this.maxLife || this.y < 0) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity * (1 - this.life / this.maxLife)
        ctx.fillStyle = '#c9a84c'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToPortfolio = () => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className={styles.hero}>
      <canvas ref={particlesRef} className={styles.canvas} />

      {/* Background layers */}
      <div className={styles.bgGradient} />
      <div className={styles.bgPattern} />
      <div className={styles.bgVignette} />

      <div className={styles.content}>
        {/* Logo placeholder */}
        <div className={styles.logoWrap}>
          <div className={styles.logoCircle} id="hero-logo-area">
            <img src="/logo.jpg" alt="Rasheed Clothing International" className={styles.logoSvg} />
          </div>
        </div>

        <p className={styles.eyebrow}>Est. Premium Collections</p>

        <h1 className={styles.title}>
          <span className={styles.titleLine1}>Rasheed Clothing</span>
          <span className={`${styles.titleLine2} gold-text`}>International</span>
        </h1>

        <div className={styles.sloganWrap}>
          <div className={styles.sloganLine} />
          <p className={styles.slogan}>Where Imagination Meets Fabrication</p>
          <div className={styles.sloganLine} />
        </div>

        <p className={styles.description}>
          Crafting excellence in every thread. From timeless traditional wear to contemporary
          designs, we bring your vision to life with unmatched quality and artisanship.
        </p>

        <div className={styles.actions}>
          <button className="btn-primary" onClick={scrollToPortfolio}>
            View Collections
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="btn-outline" onClick={scrollToContact}>Get In Touch</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>10+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>500+</span>
            <span className={styles.statLabel}>Satisfied Clients</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollDot} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
