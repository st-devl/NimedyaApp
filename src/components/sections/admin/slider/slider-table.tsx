import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import type { SliderItem } from "@/components/sections/admin/slider/types";

type SliderTableProps = {
  title: string;
  activeCount: string;
  items: SliderItem[];
  onEdit: (item: SliderItem) => void;
  onDelete: (item: SliderItem) => void;
  onToggleStatus: (item: SliderItem) => void;
};

export function SliderTable({ title, activeCount, items, onEdit, onDelete, onToggleStatus }: SliderTableProps) {
  return (
    <Card className="overflow-hidden lg:col-span-7">
      <div className="flex items-center justify-between border-b border-[color:var(--app-border)] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[color:var(--primary)]">{title}</h2>
        <Badge>{activeCount}</Badge>
      </div>
      <DataTable
        columns={[
          {
            key: "sortOrder",
            header: "Siralama",
            render: (row) => <span className="font-bold text-[color:var(--primary)]}">#{row.sortOrder + 1}</span>,
          },
          {
            key: "trTitle",
            header: "Baslik / Link",
            render: (row) => (
              <>
                <p className="font-semibold text-[color:var(--primary)]">{row.trTitle}</p>
                {row.linkUrl && <p className="text-xs text-[color:var(--app-muted)]">{row.linkUrl}</p>}
              </>
            ),
          },
          {
            key: "status",
            header: "Durum",
            render: (row) => (
              <Badge variant={row.status === "ACTIVE" ? "success" : "warning"}>
                {row.status === "ACTIVE" ? "Aktif" : "Taslak"}
              </Badge>
            ),
          },
          {
            key: "actions",
            header: "Islem",
            align: "right",
            render: (row) => (
              <div className="opacity-0 nmd-transition group-hover:opacity-100 flex gap-1">
                <Button onClick={() => onEdit(row)} size="sm" variant="ghost">Duzenle</Button>
                <Button onClick={() => onToggleStatus(row)} size="sm" variant="ghost">
                  {row.status === "ACTIVE" ? "Taslaga Al" : "Yayinla"}
                </Button>
                <Button onClick={() => onDelete(row)} size="sm" variant="danger">Sil</Button>
              </div>
            ),
          },
        ]}
        rowKey={(row) => String(row.id)}
        rows={items}
      />
    </Card>
  );
}
