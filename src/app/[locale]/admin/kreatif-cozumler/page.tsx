import { requireAdminSession } from "@/lib/auth/admin-guard";
import { redirect } from "next/navigation";
import { listContentBlocks } from "@/lib/cms/content";
import { AdminServicesPage } from "@/components/sections/admin/admin-services-page";

export default async function AdminServicesRoute() {
  const session = await requireAdminSession();
  if (!session) redirect("/tr/admin/login");

  const allBlocks = await listContentBlocks();
  const blocks = allBlocks
    .filter((b) => b.key === "homeServices")
    .map((b) => ({ locale: b.locale as "tr" | "en", data: b.data, status: b.status as "DRAFT" | "PUBLISHED" }));

  return (
    <div className="nmd-container max-w-4xl py-8 nmd-page-x">
      <AdminServicesPage initialBlocks={blocks} />
    </div>
  );
}
