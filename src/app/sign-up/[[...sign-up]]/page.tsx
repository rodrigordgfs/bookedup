import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Crie sua conta</h1>
          <p className="text-muted-foreground mt-2">
            Comece a usar o BookedUp hoje mesmo
          </p>
        </div>
        <SignUp 
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none border border-border bg-card",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-foreground text-background hover:bg-foreground/90",
              formFieldInput: "bg-background border-border text-foreground",
              formFieldLabel: "text-foreground",
              footerActionLink: "text-foreground hover:text-foreground/80",
            },
          }}
        />
      </div>
    </div>
  );
} 