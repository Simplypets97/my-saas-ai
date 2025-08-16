import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          AI SaaS Platform
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The foundation is set. Ready to build.
        </p>
        <div className="mt-6">
          <Button size="lg">Get Started</Button>
        </div>
      </div>
    </main>
  )
}