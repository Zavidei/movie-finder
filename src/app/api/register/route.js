import { NextResponse } from 'next/server';
import { addUser } from '@/app/data/authData'; 
import { signToken } from '@/app/lib/auth';

export async function POST(req) {
    try {
      const body = await req.json();
      console.log("Полученные данные на сервере:", body);  
  
      const user = await addUser(body);
      console.log("Пользователь добавлен:", user); 
  
      const token = signToken(user.email);
      console.log("Токен сгенерирован:", token); 
  
      return NextResponse.json({ token }, { status: 201 });
    } catch (error) {
      console.error("Ошибка при регистрации:", error.message); 
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  
  
