import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase'
import { getResend, getOwnerNotificationEmail } from '@/lib/resend'

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  message: z.string().min(1).max(5000),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const { error } = await getSupabaseAdmin().from('contact_messages').insert(data)
    if (error) {
      console.error('Failed to store contact message:', error)
      return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
    }

    await getResend().emails.send({
      from: 'onboarding@resend.dev',
      to: getOwnerNotificationEmail(),
      subject: `New contact message from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? 'N/A'}\n\n${data.message}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', issues: error.issues }, { status: 400 })
    }
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
