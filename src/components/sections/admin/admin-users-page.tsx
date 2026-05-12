"use client";

import { useState } from "react";

type AdminUser = {
  id: number;
  email: string;
  role: "ADMIN" | "EDITOR";
  isActive: boolean;
  createdAt: string;
};

type AdminUsersPageProps = {
  currentUserId: number;
  initialUsers: AdminUser[];
};

export function AdminUsersPage({ currentUserId, initialUsers }: AdminUsersPageProps) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [passwordTarget, setPasswordTarget] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"ADMIN" | "EDITOR">("EDITOR");
  const [newPwd, setNewPwd] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error?.message ?? "Kullanıcı oluşturulamadı."); return; }
    setUsers((u) => [...u, data.data.user]);
    setNewEmail(""); setNewPassword(""); setNewRole("EDITOR");
    setShowAddForm(false);
    setSuccess("Kullanıcı oluşturuldu.");
  }

  async function handleToggleActive(user: AdminUser) {
    setError(null);
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !user.isActive }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error?.message ?? "Güncelleme başarısız."); return; }
    setUsers((u) => u.map((x) => x.id === user.id ? data.data.user : x));
  }

  async function handleRoleChange(user: AdminUser, role: "ADMIN" | "EDITOR") {
    setError(null);
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error?.message ?? "Rol güncellenemedi."); return; }
    setUsers((u) => u.map((x) => x.id === user.id ? data.data.user : x));
    setSuccess(`${user.email} rolü güncellendi.`);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordTarget) return;
    setError(null);
    const res = await fetch(`/api/admin/users/${passwordTarget.id}/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPwd }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error?.message ?? "Şifre güncellenemedi."); return; }
    setPasswordTarget(null); setNewPwd("");
    setSuccess("Şifre güncellendi.");
  }

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="nmd-headline-xl text-[color:var(--primary)]">Kullanıcı Yönetimi</h1>
          <p className="mt-1 text-sm text-[color:var(--app-muted)]">Admin paneline erişim yetkisi olan kullanıcılar</p>
        </div>
        <button
          className="rounded-xl bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[color:var(--on-primary)] hover:opacity-90"
          onClick={() => setShowAddForm(!showAddForm)}
          type="button"
        >
          {showAddForm ? "İptal" : "+ Yeni Kullanıcı"}
        </button>
      </header>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
      )}

      {showAddForm && (
        <form className="mb-8 rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-6 shadow-sm" onSubmit={handleCreate}>
          <h2 className="mb-4 text-base font-semibold text-[color:var(--primary)]">Yeni Kullanıcı Ekle</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-[color:var(--app-muted)]">E-posta</label>
              <input
                className="w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="ornek@nimedya.com"
                required
                type="email"
                value={newEmail}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-[color:var(--app-muted)]">Şifre (min. 8 karakter)</label>
              <input
                className="w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
                minLength={8}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                type="password"
                value={newPassword}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-[color:var(--app-muted)]">Rol</label>
              <select
                className="w-full rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
                onChange={(e) => setNewRole(e.target.value as "ADMIN" | "EDITOR")}
                value={newRole}
              >
                <option value="EDITOR">Editör</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
          <button
            className="mt-4 rounded-lg bg-[color:var(--primary)] px-5 py-2 text-sm font-semibold text-[color:var(--on-primary)] hover:opacity-90"
            type="submit"
          >
            Oluştur
          </button>
        </form>
      )}

      {passwordTarget && (
        <form className="mb-8 rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] p-6 shadow-sm" onSubmit={handlePasswordChange}>
          <h2 className="mb-2 text-base font-semibold text-[color:var(--primary)]">Şifre Değiştir — {passwordTarget.email}</h2>
          <div className="flex gap-3">
            <input
              className="flex-1 rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
              minLength={8}
              onChange={(e) => setNewPwd(e.target.value)}
              placeholder="Yeni şifre (min. 8 karakter)"
              required
              type="password"
              value={newPwd}
            />
            <button className="rounded-lg bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--on-primary)] hover:opacity-90" type="submit">Kaydet</button>
            <button className="rounded-lg bg-[color:var(--surface-container-low)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)] hover:opacity-90" onClick={() => setPasswordTarget(null)} type="button">İptal</button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-[color:var(--app-border)]/30 bg-[color:var(--app-card)] shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[color:var(--surface-container-low)]">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">E-posta</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">Rol</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">Durum</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--app-muted)]">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--outline-variant)]/20">
            {users.map((user) => (
              <tr className="hover:bg-[color:var(--app-bg)]" key={user.id}>
                <td className="px-6 py-4 font-semibold text-[color:var(--primary)]">
                  {user.email}
                  {user.id === currentUserId && <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">Sen</span>}
                </td>
                <td className="px-6 py-4">
                  {user.id === currentUserId ? (
                    <span className="rounded-full bg-[color:var(--surface-container-low)] px-3 py-1 text-xs font-semibold text-[color:var(--primary)]">{user.role}</span>
                  ) : (
                    <select
                      className="rounded-lg border border-[color:var(--app-border)]/40 bg-[color:var(--surface-container-low)] px-2 py-1 text-xs"
                      onChange={(e) => handleRoleChange(user, e.target.value as "ADMIN" | "EDITOR")}
                      value={user.role}
                    >
                      <option value="EDITOR">Editör</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {user.isActive ? "Aktif" : "Devre Dışı"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg bg-[color:var(--surface-container-low)] px-3 py-1.5 text-xs font-semibold text-[color:var(--primary)] hover:opacity-80"
                      onClick={() => setPasswordTarget(user)}
                      type="button"
                    >
                      Şifre Değiştir
                    </button>
                    {user.id !== currentUserId && (
                      <button
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold hover:opacity-80 ${user.isActive ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                        onClick={() => handleToggleActive(user)}
                        type="button"
                      >
                        {user.isActive ? "Devre Dışı Bırak" : "Aktifleştir"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
