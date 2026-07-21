'use client'
import { useState } from 'react'
import { activeConfig } from '@/configs/active'

export default function Contact() {
  const { contact, business } = activeConfig
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!contact.formEnabled) return
    setSending(true)
    const form = e.currentTarget
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section-alt">
      <div className="wrap" style={{ maxWidth: '640px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '16px' }}>Get in touch</h2>
        <p className="muted" style={{ marginBottom: '32px' }}>
          Call <a href={`tel:${business.phone.replace(/[^\d]/g, '')}`} style={{ color: 'var(--accent)' }}>{business.phone}</a> or send a message below.
        </p>

        {contact.formEnabled && !sent && (
          <form action={`https://formspree.io/f/${contact.formspreeId}`} method="POST" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '14px', marginBottom: '16px' }}>
              <input name="name" placeholder="Your name" required
                style={{ padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink)', fontFamily: 'var(--font-body)' }} />
              <input name="email" type="email" placeholder="Your email" required
                style={{ padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink)', fontFamily: 'var(--font-body)' }} />
              <textarea name="message" placeholder={contact.messagePlaceholder || 'How can we help?'} rows={4} required
                style={{ padding: '13px 16px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink)', fontFamily: 'var(--font-body)', resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
        {sent && <p style={{ color: 'var(--accent)', fontWeight: 600 }}>Thanks — we&apos;ll be in touch shortly.</p>}
      </div>
    </section>
  )
}
