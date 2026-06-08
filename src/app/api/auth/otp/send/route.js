export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60000);

    // Save to database
    await prisma.otp.create({
      data: {
        phone,
        code,
        expiresAt
      }
    });

    // In a real application, you would integrate Twilio or Fast2SMS here:
    // await twilioClient.messages.create({ body: `Your OTP is ${code}`, to: phone, from: '...' });
    
    // For now, we simulate sending by logging to the terminal
    console.log('=====================================================');
    console.log(`[SIMULATED SMS] Sent OTP to ${phone}: ${code}`);
    console.log('=====================================================');

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Send Error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
