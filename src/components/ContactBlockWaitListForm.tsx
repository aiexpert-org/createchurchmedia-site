'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/Button'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Status = 'idle' | 'submitting' | 'done' | 'error'

/**
 * Inline wait-list capture for the black ContactBlock. Mirrors the footer form
 * (first name, last name, email) but is styled for a dark surface: light text
 * on a translucent field, with a solid rectangular yellow submit button (the
 * locked form-CTA treatment). Posts to the same /api/contact endpoint, tagged
 * so contact-block signups are identifiable in GHL.
 *
 * Accessibility: every field has a real (visually hidden) <label>; validation
 * and request errors surface in a polite live region so screen readers announce
 * them.
 */
export function ContactBlockWaitListForm() {
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Honeypot: bots fill this, real users never see it.
    const honey = (
      event.currentTarget.elements.namedItem('company') as HTMLInputElement | null
    )?.value
    if (honey) {
      setStatus('done')
      return
    }

    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setError('Enter a valid email address.')
      return
    }
    setError(null)
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: value,
          source: 'contact-block',
          tag: 'wait-list-contact-block-2026',
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p
        role="status"
        className="mt-8 max-w-md rounded-2xl bg-white/5 px-5 py-4 text-base leading-7 text-neutral-200"
      >
        You&rsquo;re on the list. Emily will reach out personally by email when a
        spot opens.
      </p>
    )
  }

  const fieldClass =
    'w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base text-white transition placeholder:text-neutral-500 focus:border-white focus:ring-2 focus:ring-white/25 focus:outline-none disabled:opacity-60'

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-md">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-first`} className="sr-only">
            First name
          </label>
          <input
            id={`${uid}-first`}
            type="text"
            name="firstName"
            autoComplete="given-name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={status === 'submitting'}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-last`} className="sr-only">
            Last name
          </label>
          <input
            id={`${uid}-last`}
            type="text"
            name="lastName"
            autoComplete="family-name"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={status === 'submitting'}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${uid}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email address"
          aria-invalid={error ? true : undefined}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          disabled={status === 'submitting'}
          className={fieldClass}
        />
      </div>

      {/* Honeypot field, hidden from real users. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="solid"
          tone="dark"
          withArrow
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Joining' : 'Join the wait list'}
        </Button>
      </div>

      <div role="status" aria-live="polite">
        {error ? (
          <p className="mt-3 text-sm text-neutral-300">{error}</p>
        ) : null}
        {status === 'error' ? (
          <p className="mt-3 text-sm text-neutral-300">
            Something went wrong. Please try again or email Emily directly.
          </p>
        ) : null}
      </div>
    </form>
  )
}
