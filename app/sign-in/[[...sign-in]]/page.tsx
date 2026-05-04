import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="relative w-full max-w-md">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "sl-btn-primary w-full !shadow-none",
              card: "sl-card border-none bg-card shadow-2xl",
              headerTitle: "text-[var(--sl-text)] font-bold",
              headerSubtitle: "text-[var(--sl-text-muted)]",
              socialButtonsBlockButton: "sl-btn-ghost border-border hover:bg-secondary transition-all",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              footerActionLink: "text-primary hover:text-primary/80 font-semibold",
              formFieldLabel: "text-muted-foreground font-medium",
              formFieldInput: "bg-secondary border-border focus:border-primary transition-all",
            }
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
