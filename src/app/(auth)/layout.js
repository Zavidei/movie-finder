"use client"; 

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { verifyToken } from '../lib/auth';

export default function AuthLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token && verifyToken(token)) {
        router.push('/dashboard');
      }
    }
  }, []);

  return <>{children}</>;
}