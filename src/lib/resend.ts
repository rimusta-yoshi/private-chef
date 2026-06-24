import { Resend } from 'resend'

let client: Resend | null = null

export function getResend(): Resend {
  if (client) return client

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  client = new Resend(resendApiKey)
  return client
}

export function getOwnerNotificationEmail(): string {
  const email = process.env.OWNER_NOTIFICATION_EMAIL
  if (!email) {
    throw new Error('OWNER_NOTIFICATION_EMAIL is not configured')
  }
  return email
}
