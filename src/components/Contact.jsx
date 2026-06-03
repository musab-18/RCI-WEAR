import { useState } from 'react'
import styles from './Contact.module.css'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('')

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // Construct WhatsApp message
    const waText = `*New Order*%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Phone:* ${form.phone || 'Not provided'}%0A*Subject:* ${form.subject || 'Enquiry'}%0A*Message:* ${form.message}`
    const waLink = `https://wa.me/923496014611?text=${waText}`

    setTimeout(() => {
      window.open(waLink, '_blank')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus(''), 4000)
    }, 800)
  }

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <p className="section-label">Reach Us</p>
          <h2 className="section-title">
            Let's Create <span className="gold-text">Together</span>
          </h2>
          <div className="divider" />
        </div>

        <div className={styles.grid}>
          {/* Info */}
          <div className={`${styles.info} reveal-left`} style={{ transitionDelay: '0.1s' }}>
            <p className={styles.infoText}>
              Have a project in mind? Whether it's a custom order, bulk requirement, or a new
              collection — we'd love to hear from you. Reach out and let's bring your vision to life.
            </p>

            <div className={styles.contactItems}>
              <a href="mailto:rasheedclothingintl@gmail.com" className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Email Us</span>
                  <span className={styles.contactValue}>rasheedclothingintl@gmail.com</span>
                </div>
              </a>

              <a href="tel:+923496014611" className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.21 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Call Us</span>
                  <span className={styles.contactValue}>+92 349 601 4611</span>
                </div>
              </a>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Working Hours</span>
                  <span className={styles.contactValue}>Mon – Sat: 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Social links placeholder */}
            <div className={styles.social}>
              <p className={styles.socialLabel}>Follow Us</p>
              <div className={styles.socialLinks}>
                <MagneticButton className={styles.socialBtn} onClick={() => window.open('https://www.instagram.com/rasheedclothingintl?igsh=MW9zYTk1dXdjdndvdw==', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </MagneticButton>
                <MagneticButton className={styles.socialBtn} onClick={() => window.open('https://www.facebook.com/share/184dG574x7/', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </MagneticButton>
                <MagneticButton className={styles.socialBtn} onClick={() => window.open('https://wa.me/923496014611', '_blank')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className={`${styles.form} reveal-right`} style={{ transitionDelay: '0.15s' }} onSubmit={submit}>
            <div className={styles.row}>
              <div className={`${styles.field} ${form.name ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Your Name</label>
                <input name="name" value={form.name} onChange={handle} className={styles.input} placeholder="e.g. Ahmed Khan" required />
              </div>
              <div className={`${styles.field} ${form.email ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handle} className={styles.input} placeholder="you@example.com" required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={`${styles.field} ${form.phone ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handle} className={styles.input} placeholder="+92 300 000 0000" />
              </div>
              <div className={`${styles.field} ${form.subject ? styles['has-value'] : ''}`}>
                <label className={styles.label}>Subject</label>
                <select name="subject" value={form.subject} onChange={handle} className={`${styles.input} ${!form.subject ? styles['select-placeholder'] : ''}`}>
                  <option value="">Select a topic</option>
                  <option value="Custom Order Enquiry">Custom Order Enquiry</option>
                  <option value="Bulk / Wholesale Order">Bulk / Wholesale Order</option>
                  <option value="Bridal Collection">Bridal Collection</option>
                  <option value="Corporate Uniforms">Corporate Uniforms</option>
                  <option value="General Information">General Information</option>
                </select>
              </div>
            </div>
            <div className={`${styles.field} ${form.message ? styles['has-value'] : ''}`}>
              <label className={styles.label}>Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Tell us about your project or requirements..."
                rows={5}
                required
              />
            </div>
            <button type="submit" disabled={status === 'sending'} className={`btn-primary ${styles.submitBtn}`}>
              {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : status === 'error' ? 'Error. Try Again' : 'Send Message'}
              {status === '' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
