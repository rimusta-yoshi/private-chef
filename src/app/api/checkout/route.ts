import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'

const checkoutSchema = z.object({
  bookingId: z.string().uuid(),
  amountCents: z.number().int().min(100),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { bookingId, amountCents } = checkoutSchema.parse(body)

    const supabaseAdmin = getSupabaseAdmin()
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .select('id, email')
      .eq('id', bookingId)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: booking.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Booking deposit' },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: { bookingId: booking.id },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking/cancelled`,
    })

    await supabaseAdmin
      .from('bookings')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', booking.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', issues: error.issues }, { status: 400 })
    }
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
