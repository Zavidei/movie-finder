import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/app/data/authData';  
import { verifyToken } from '@/app/lib/auth';  

export async function GET(req) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');  

    if (!token) throw new Error("Токен не предоставлен");

    const decoded = verifyToken(token); 
    const user = await getUserByEmail(decoded.email);  

    return NextResponse.json({ email: user.email }, { status: 200 });  
  } catch (error) {
    console.error("Ошибка получения данных пользователя:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
