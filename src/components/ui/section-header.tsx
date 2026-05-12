import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({ title, description, actions, align = "left" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-8 ${alignClass}`}>
      <h2 className="nmd-headline-xl text-[color:var(--primary)]">{title}</h2>
      {description ? <p className="nmd-body-lg mt-3 text-[color:var(--app-muted)]">{description}</p> : null}
      {actions ? <div className="mt-4">{actions}</div> : null}
    </div>
  );
}
