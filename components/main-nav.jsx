import Link from "next/link"
import { auth, signIn, signOut } from "@/auth"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This is a Server Component, so we can use async/await
export async function MainNav() {
  const session = await auth() // Get the session object

  return (
    <header className="container mx-auto">
      <div className="flex h-16 items-center justify-between border-b">
        <Link href="/" className="font-bold">
          AI Platform
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Tools-Dashboard
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Blog
          </Link>

          {/* Conditionally render login or user menu */}
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <SignInButton />
          )}
        </nav>
      </div>
    </header>
  )
}

// A separate component for the Sign In button
function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button variant="outline">Login</Button>
    </form>
  )
}

// --- THIS IS THE UPDATED COMPONENT ---
function UserMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* The Dashboard link should be here */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <form 
            action={async () => {
              "use server"
              await signOut()
            }}
            className="w-full"
          >
            <button type="submit" className="w-full text-left">Log out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}