import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

// Public route to get all active departments, or Admin to get all
export async function GET(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    let isAdmin = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) isAdmin = true;
      } catch (e) {}
    }

    const query = isAdmin ? {} : { status: 'Active' };
    const departments = await prisma.department.findMany({
      where: query,
      orderBy: { createdAt: 'desc' }
    });
    
    // Map _id for frontend compatibility during migration
    const mapped = departments.map(d => ({ ...d, _id: d.id }));
    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

// Protected route to create a department
export async function POST(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    jwt.verify(token, process.env.JWT_SECRET);
    
    const data = await request.json();
    
    const department = await prisma.department.create({ data });
    return NextResponse.json({ ...department, _id: department.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}
