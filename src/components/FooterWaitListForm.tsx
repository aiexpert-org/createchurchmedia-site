'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Status = 'idle' | 'submitting' | 'done' | 'error'

/**
 * Low-friction wait-list capture for the footer. Single email field, posts to
 * the same /api/contact endpoint the full form uses, tagged so footer signups
 * are identifiable in the CRM. Email-only is allowed server-side. On success the
 * field is swapped for a confirmation line; errors surface inline and never
 * break the page.
 */
export function FooterWaitListForm() {
  const [status, setStatus] = useState<Status>('idle')
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
          email: value,
          source: 'footer',
          tag: 'wait-list-footer-2026',
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
      <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-700">
        You&rsquo;re on the list. Emily will reach out by email.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-3 max-w-xs">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError(null)
          }}
          disabled={status === 'submitting'}
          className="min-w-0 flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/5 focus:outline-none disabled:opacity-60"
        />
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining' : 'Join'}
        </Button>
      </div>

      {/* Honeypot field, hidden from real users. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error ? (
        <p className="mt-2 text-sm text-neutral-700">{error}</p>
      ) : null}
      {status === 'error' ? (
        <p className="mt-2 text-sm text-neutral-700">
          Something went wrong. Please try again or email Emily directly.
        </p>
      ) : null}
    </form>
  )
}
