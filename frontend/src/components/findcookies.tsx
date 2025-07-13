"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useSessionCheck() {
  const router = useRouter();

  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch("http://localhost:3001/auth/check-session", {
          credentials: "include", 
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        
      } catch {
        router.push("/login");
      }
    }

    verifySession();
  }, [router]);
}
