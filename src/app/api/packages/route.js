export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const packages = await prisma.healthPackage.findMany({
      where: { status: 'Active' },
      orderBy: { price: 'asc' }
    });
    
    // Map included_tests to array
    const mapped = packages.map(p => ({
      ...p,
      included_tests: p.included_tests ? JSON.parse(p.included_tests) : []
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    if (Array.isArray(data.included_tests)) {
      data.included_tests = JSON.stringify(data.included_tests);
    }
    const healthPackage = await prisma.healthPackage.create({ data });
    return NextResponse.json(healthPackage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
