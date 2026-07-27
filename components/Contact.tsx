'use client'
import { useState } from 'react'
import { activeConfig } from '@/configs/active'
import HandUnderline from '@/components/HandUnderline'
import { isUsableFormspreeId, isRealPhone } from '@/lib/guards'

export default function Contact() {
  const { contact, business } = activeConfig
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)

  // Whether a real Formspree endpoint is configured. The form renders either
  // way — when it isn't, submitting hands off to the visitor's mail client
  // with the fields already filled in, so a message is never just dropped.
  const hasEndpoint = isUsableFormspreeId(contact.formspreeId)

  function handoffToMailClient(form: HTMLFormElement) {
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const subject = encodeURIComponent(`Website enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    if (!hasEndpoint) {
      handoffToMailClient(form)
      return
    }

    setSending(true)
    setFailed(false)
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      // A non-2xx is just as much a lost lead as a thrown error — treat both
      // the same and tell the visitor, rather than resetting the button and
      // letting them assume it sent.
      if (res.ok) setSent(true)
      else setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section-alt">
      <div className="wrap" style={{ maxWidth: '640px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '16px' }}>
          <HandUnderline>{activeConfig.sectionCopy?.contactHeading || 'Get in touch'}</HandUnderline>
        </h2>
        <p className="muted" style={{ marginBottom: '32px' }}>
          {isRealPhone(business.phone) ? (
            <>
              Call <a href={`tel:${business.phone.replace(/[^\d]/g, '')}`} style={{ color: 'var(--accent)' }}>{business.phone}</a> or send a message below.
            </>
          ) : (
            <>
              Email {business.email} or send a message below.
            </>
          )}
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
            {failed && (
              <p style={{ marginTop: '16px', fontSize: '15px', lineHeight: 1.6 }}>
                <strong>That didn&apos;t go through.</strong>{' '}
                <span className="muted">
                  Please email {business.email} directly and it&apos;ll reach me.
                </span>
              </p>
            )}
          </form>
        )}

        {sent && (
          <p style={{ color: 'var(--accent)', fontWeight: 600 }}>
            {hasEndpoint
              ? 'Thanks — I’ll be in touch shortly.'
              : 'Your email app should be opening with the message ready to send.'}
          </p>
        )}
      </div>
    </section>
  )
}
