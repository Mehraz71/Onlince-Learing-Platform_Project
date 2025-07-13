'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          'http://localhost:3001/auth/logout', 
          {},
          {
            withCredentials: true, 
          }
        );

        localStorage.clear();
        sessionStorage.clear();
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">

      Logging out...
      
    </div>
  );
}
