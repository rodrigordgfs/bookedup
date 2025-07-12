"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    businessName: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.email) newErrors.email = "Email é obrigatório";
    if (!formData.phone) newErrors.phone = "Telefone é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não conferem";
    }
    if (!formData.accountType)
      newErrors.accountType = "Tipo de conta é obrigatório";
    if (formData.accountType === "business" && !formData.businessName) {
      newErrors.businessName = "Nome do negócio é obrigatório";
    }
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "Você deve aceitar os termos";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registration successful");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Criar conta
            </CardTitle>
            <p className="text-slate-600 mt-2">
              Cadastre-se para começar a usar nossa plataforma
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-medium">
                  Nome completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`h-12 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700 font-medium">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="accountType"
                  className="text-slate-700 font-medium"
                >
                  Tipo de conta
                </Label>
                <Select
                  value={formData.accountType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, accountType: value })
                  }
                >
                  <SelectTrigger
                    className={`h-12 ${
                      errors.accountType ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Selecione o tipo de conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="business">
                      Profissional/Negócio
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.accountType && (
                  <p className="text-sm text-red-600">{errors.accountType}</p>
                )}
              </div>

              {formData.accountType === "business" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="businessName"
                    className="text-slate-700 font-medium"
                  >
                    Nome do negócio
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Nome da sua empresa/negócio"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className={`h-12 ${
                      errors.businessName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-red-600">
                      {errors.businessName}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-medium"
                >
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`h-12 pr-10 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-slate-700 font-medium"
                >
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`h-12 pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked as boolean })
                  }
                />
                <Label htmlFor="agreeTerms" className="text-sm text-slate-600">
                  Concordo com os{" "}
                  <Link
                    href="/terms"
                    className="text-slate-800 hover:underline"
                  >
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacy"
                    className="text-slate-800 hover:underline"
                  >
                    política de privacidade
                  </Link>
                </Label>
              </div>
              {errors.agreeTerms && (
                <p className="text-sm text-red-600">{errors.agreeTerms}</p>
              )}

              <Button
                type="submit"
                className={`w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Já tem uma conta?{" "}
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
