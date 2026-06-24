import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getResend, getOwnerNotificationEmail } from '@/lib/resend'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const rawBody = await request.text()

  let event
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const bookingId = session.metadata?.bookingId

    if (bookingId) {
      await getSupabaseAdmin()
        .from('bookings')
        .update({ deposit_paid: true, status: 'confirmed' })
        .eq('id', bookingId)

      await getResend().emails.send({
        from: 'onboarding@resend.dev',
        to: getOwnerNotificationEmail(),
        subject: 'Deposit received for booking',
        text: `Booking ${bookingId} deposit has been paid and confirmed.`,
      })
    }
  }

  return NextResponse.json({ received: true })
}
