"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextInput } from "@/components/ui/input";

type AdminLoginFormProps = {
  locale: "tr" | "en";
};

export function AdminLoginForm({ locale }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = locale === "tr"
    ? {
        title: "Admin Girisi",
        subtitle: "Admin paneline erismek icin sifrenizi girin.",
        email: "E-posta",
        password: "Sifre",
        button: "Giris Yap",
        loading: "Giris yapiliyor...",
        invalid: "Giris basarisiz. Sifrenizi kontrol edin.",
      }
    : {
        title: "Admin Login",
        subtitle: "Enter your password to access the admin panel.",
        email: "Email",
        password: "Password",
        button: "Sign In",
        loading: "Signing in...",
        invalid: "Login failed. Check your password.",
      };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError(labels.invalid);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(labels.invalid);
        return;
      }

      router.replace(`/${locale}/admin`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="nmd-container nmd-page-x flex min-h-[calc(100vh-80px)] items-center justify-center py-16">
      <Card className="w-full max-w-md p-8">
        <h1 className="nmd-headline-xl text-[color:var(--primary)]">{labels.title}</h1>
        <p className="mt-2 text-sm text-[color:var(--app-muted)]">{labels.subtitle}</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="admin-email">{labels.email}</label>
            <TextInput id="admin-email" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
          </div>
          <div>
            <label className="nmd-label-sm mb-2 block text-[color:var(--app-muted)]" htmlFor="admin-password">{labels.password}</label>
            <TextInput id="admin-password" onChange={(e) => setPassword(e.target.value)} type="password" value={password} />
          </div>

          <Button className="w-full" disabled={loading} type="submit">
            {loading ? labels.loading : labels.button}
          </Button>

          {error ? <p className="text-sm text-[color:var(--error)]">{error}</p> : null}
        </form>
      </Card>
    </main>
  );
}
