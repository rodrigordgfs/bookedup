"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Email é obrigatório");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Email enviado!
              </CardTitle>
              <p className="text-slate-600 mt-2">
                Enviamos as instruções para redefinir sua senha paara{" "}
                <strong>{email}</strong>
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  Verifique sua caixa de entrada e spam. O email pode levar
                  alguns minutos para chegar.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full h-12"
                >
                  Tentar outro email
                </Button>

                <Link href="/auth/login">
                  <Button className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                    Voltar ao login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Esqueceu sua senha?
            </CardTitle>
            <p className="text-slate-600 mt-2">
              Digite seu email e enviaremos as instruções para redefinir sua
              senha
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 ${error ? "border-red-500" : ""}`}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <Button
                type="submit"
                className={`w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar instruções"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Lembrou da senha?{" "}
                <Link
                  href="/auth/login"
                  className="text-slate-800 font-medium hover:underline"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
