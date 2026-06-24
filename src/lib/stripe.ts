import Stripe from 'stripe'

let client: Stripe | null = null

export function getStripe(): Stripe {
  if (client) return client

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }

  client = new Stripe(stripeSecretKey)
  return client
}
