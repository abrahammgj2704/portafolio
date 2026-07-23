import { useState } from 'react'
import { EMAIL_REGEX } from '../constants'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Ingresa un email valido antes de suscribirte.')
      return
    }
    setSubscribed(true)
    setEmail('')
    setEmailError('')
  }

  function handleChange(e) {
    setEmail(e.target.value)
    if (emailError) setEmailError('')
    if (subscribed) setSubscribed(false)
  }

  const isDisabled = !email || !EMAIL_REGEX.test(email)

  return (
    <section className="subscribe-section">
      <h2>Suscribete a ofertas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="tu@email.com"
          aria-label="Correo electronico"
          aria-describedby={emailError ? 'email-error' : undefined}
        />
        <button type="submit" disabled={isDisabled}>
          Suscribirse
        </button>
      </form>
      {emailError && (
        <p id="email-error" className="form-error" role="alert">
          {emailError}
        </p>
      )}
      {subscribed && (
        <p className="form-success" role="status">
          Suscripcion exitosa!
        </p>
      )}
    </section>
  )
}
