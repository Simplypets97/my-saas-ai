import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Welcome to your dashboard. Access your tools below.
      </p>
      <div className="mt-6">
        <Button asChild>
            <Link href="/dashboard/tools/hook-generator">
                Go to Tweet Hook Generator
            </Link>
        </Button>
      </div>
    </div>
  );
}