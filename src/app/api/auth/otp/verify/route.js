export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Phone and OTP code are required' }, { status: 400 });
    }

    // Find the latest unexpired OTP for this phone number
    const otpRecord = await prisma.otp.findFirst({
      where: {
        phone,
        code,
        expiresAt: {
          gt: new Date()
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // OTP is valid. Now check if the user exists
    let user = await prisma.user.findUnique({
      where: { phone }
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          role: 'Patient',
          status: 'Active'
        }
      });
    }

    // Delete the OTP record so it can't be reused
    await prisma.otp.delete({
      where: { id: otpRecord.id }
    });

    // Ensure user is active
    if (user.status !== 'Active') {
      return NextResponse.json({ error: 'Account is inactive' }, { status: 403 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret_for_development',
      { expiresIn: '30d' }
    );

    const response = NextResponse.json({ 
      message: 'Login successful',
      user: { id: user.id, phone: user.phone, name: user.name, role: user.role }
    });

    // Set cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('OTP Verify Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
