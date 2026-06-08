export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const department_id = searchParams.get('department_id');
    const search = searchParams.get('search');
    
    const token = request.cookies.get('auth_token')?.value;
    let isAdmin = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) isAdmin = true;
      } catch (e) {}
    }

    let where = isAdmin ? {} : { status: 'Active' };
    
    if (department_id) {
      where.department_id = department_id;
    }
    
    if (search) {
      where.name = { contains: search };
    }

    const doctors = await prisma.doctor.findMany({
      where,
      include: {
        department: {
          select: { id: true, name: true, slug: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Map data for frontend compatibility
    const mapped = doctors.map(d => ({
      ...d,
      _id: d.id,
      department_id: { _id: d.department.id, name: d.department.name, slug: d.department.slug },
      available_days: d.available_days ? JSON.parse(d.available_days) : [],
      time_slots: d.time_slots ? JSON.parse(d.time_slots) : []
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    jwt.verify(token, process.env.JWT_SECRET);
    
    const data = await request.json();
    
    // Handle JSON fields
    if (Array.isArray(data.available_days)) data.available_days = JSON.stringify(data.available_days);
    if (Array.isArray(data.time_slots)) data.time_slots = JSON.stringify(data.time_slots);
    
    const doctor = await prisma.doctor.create({ data });
    return NextResponse.json({ ...doctor, _id: doctor.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
