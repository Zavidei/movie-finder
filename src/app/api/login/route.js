import { NextResponse } from 'next/server';
import { findUserByCredentials } from '@/app/data/authData';
import { signToken } from '@/app/lib/auth';

export async function POST(req) {
  try {
    const body = await req.json();
    const user = await findUserByCredentials(body.email, body.password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken(user.email);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
