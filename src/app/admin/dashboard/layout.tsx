import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-emerald-500/25 selection:text-emerald-300">
      <AdminSidebar session={session} />
      <main className="flex-1 overflow-y-auto max-h-screen p-4 sm:p-6 lg:p-8 bg-grid-pattern">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
