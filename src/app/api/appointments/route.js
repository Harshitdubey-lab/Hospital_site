export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Admin view appointments
export async function GET(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    jwt.verify(token, process.env.JWT_SECRET);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where = status ? { status } : {};

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        department: { select: { name: true } },
        doctor: { select: { name: true } }
      },
      orderBy: { appointment_date: 'desc' }
    });
    
    const mapped = appointments.map(a => ({
      ...a,
      _id: a.id,
      department_id: { name: a.department.name },
      doctor_id: { name: a.doctor.name }
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

// Public book appointment
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Convert age to int if present
    if (data.age) data.age = parseInt(data.age, 10);
    // Ensure date is valid ISO
    data.appointment_date = new Date(data.appointment_date);
    
    // Generate an appointment ID
    data.appointment_code = 'APT-' + Math.floor(100000 + Math.random() * 900000);
    
    const appointment = await prisma.appointment.create({ 
      data,
      include: {
        department: true,
        doctor: true
      }
    });

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'mylene.murazik95@ethereal.email',
            pass: 'j5w2vK9aKjZqM6wV3U'
        }
      });

      const mailOptions = {
        from: '"Hospital Management System" <system@citycare.com>',
        to: 'admin@citycare.com', // hospital ID
        subject: `New Appointment Booking: ${appointment.appointment_code}`,
        text: `A new appointment has been booked.\n\nPatient: ${appointment.patient_name}\nDoctor: ${appointment.doctor.name}\nDepartment: ${appointment.department.name}\nDate: ${appointment.appointment_date.toDateString()} at ${appointment.appointment_time}\nPhone: ${appointment.phone}`
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent to hospital ID successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    return NextResponse.json({ ...appointment, _id: appointment.id }, { status: 201 });
  } catch (error) {
    console.error('Booking error', error);
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}

// Admin update appointment status
export async function PUT(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    jwt.verify(token, process.env.JWT_SECRET);
    
    const { id, status } = await request.json();
    
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    });
    
    return NextResponse.json({ ...appointment, _id: appointment.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}
