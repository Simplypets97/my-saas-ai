export function SiteFooter() {
  return (
    <footer className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 border-t py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          © {new Date().getFullYear()} AI Platform. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}