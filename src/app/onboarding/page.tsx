"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded && user) {
      fetch("http://127.0.0.1:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error("Erro ao criar usuário no backend:", err);
        });
    }
  }, [isLoaded, user]);

  // Animação da barra de progresso
  useEffect(() => {
    let progress = 0;
    let direction = 1;
    const interval = setInterval(() => {
      if (progressRef.current) {
        progress += direction * 2;
        if (progress >= 100) {
          direction = -1;
          progress = 100;
        } else if (progress <= 0) {
          direction = 1;
          progress = 0;
        }
        progressRef.current.style.width = `${progress}%`;
      }
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Configurando sua conta...</h1>
          <p className="text-muted-foreground mt-2">
            Estamos preparando tudo para você começar a usar o BookedUp. Isso levará apenas alguns instantes.
          </p>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
          <div ref={progressRef} className="h-2 bg-primary transition-all duration-100" style={{ width: '0%' }}></div>
        </div>
      </div>
    </div>
  );
} 