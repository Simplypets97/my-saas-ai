import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Please sign in to continue</h1>
      <form
        action={async () => {
          "use server"
          // Redirect to the dashboard after a successful login
          await signIn("google", { redirectTo: "/dashboard" })
        }}
      >
        <Button>Sign in with Google</Button>
      </form>
    </div>
  )
}