import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import type { SliderRow } from "@/components/sections/admin/slider/types";

type SliderTableProps = {
  title: string;
  activeCount: string;
  rows: SliderRow[];
};

export function SliderTable({ title, activeCount, rows }: SliderTableProps) {
  return (
    <Card className="overflow-hidden lg:col-span-7">
      <div className="flex items-center justify-between border-b border-[color:var(--app-border)] px-6 py-4">
        <h2 className="text-2xl font-semibold text-[color:var(--primary)]">{title}</h2>
        <Badge>{activeCount}</Badge>
      </div>
      <DataTable
        columns={[
          { key: "id", header: "Siralama", render: (row) => <span className="font-bold text-[color:var(--primary)]">{row.id}</span> },
          { key: "title", header: "Gorsel / Baslik", render: (row) => <><p className="font-semibold text-[color:var(--primary)]">{row.title}</p><p className="text-xs text-[color:var(--app-muted)]">{row.url}</p></> },
          { key: "status", header: "Durum", render: (row) => <Badge variant={row.status === "Aktif" ? "success" : "warning"}>{row.status}</Badge> },
          {
            key: "actions",
            header: "Islem",
            align: "right",
            render: () => (
              <div className="opacity-0 nmd-transition group-hover:opacity-100">
                <Button className="mr-2" size="sm" variant="ghost">Duzenle</Button>
                <Button size="sm" variant="danger">Sil</Button>
              </div>
            ),
          },
        ]}
        rowKey={(row) => row.id}
        rows={rows}
      />
    </Card>
  );
}
