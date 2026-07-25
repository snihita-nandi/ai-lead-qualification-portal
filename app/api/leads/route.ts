import { NextResponse } from 'next/server';

// GET /api/leads
export async function GET() {
  return NextResponse.json({ message: 'GET /api/leads — not implemented' }, { status: 501 });
}

// POST /api/leads
export async function POST() {
  return NextResponse.json({ message: 'POST /api/leads — not implemented' }, { status: 501 });
}
