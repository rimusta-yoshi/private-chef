import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getResend, getOwnerNotificationEmail } from '@/lib/resend'

const bookingSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  eventDate: z.string().date(),
  guestCount: z.number().int().min(1).max(1000),
  eventType: z.string().max(200).optional(),
  notes: z.string().max(5000).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = bookingSchema.parse(body)

    const { data: booking, error } = await getSupabaseAdmin()
      .from('bookings')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        event_date: data.eventDate,
        guest_count: data.guestCount,
        event_type: data.eventType,
        notes: data.notes,
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to store booking:', error)
      return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 })
    }

    await getResend().emails.send({
      from: 'onboarding@resend.dev',
      to: getOwnerNotificationEmail(),
      subject: `New booking request from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? 'N/A'}\nDate: ${data.eventDate}\nGuests: ${data.guestCount}\nEvent type: ${data.eventType ?? 'N/A'}\n\n${data.notes ?? ''}`,
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', issues: error.issues }, { status: 400 })
    }
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
