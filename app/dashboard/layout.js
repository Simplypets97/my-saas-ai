import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardLayout({ children }) {
  return (
    <div className="container mx-auto grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav />
      </aside>
      <main>{children}</main>
    </div>
  )
}