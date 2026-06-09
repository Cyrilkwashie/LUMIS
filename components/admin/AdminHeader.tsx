"use client";

import { useRouter } from "next/navigation";

type AdminHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function AdminHeader({
  title,
  description,
  action,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-syne text-3xl font-bold text-heading">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-grey">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {action}
        <button
          type="button"
          onClick={handleLogout}
          className="border border-border px-4 py-2 text-sm text-body transition-colors hover:border-heading hover:text-heading"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
