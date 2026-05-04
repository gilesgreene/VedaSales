import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="relative w-full max-w-md">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: "vs-btn-primary w-full !shadow-none",
              card: "vs-card border-none bg-card shadow-2xl",
              headerTitle: "text-[var(--vs-text)] font-bold",
              headerSubtitle: "text-[var(--vs-text-muted)]",
              socialButtonsBlockButton: "vs-btn-ghost border-border hover:bg-secondary transition-all",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              footerActionLink: "text-primary hover:text-primary/80 font-semibold",
              formFieldLabel: "text-muted-foreground font-medium",
              formFieldInput: "bg-secondary border-border focus:border-primary transition-all",
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/onboarding"
        />
      </div>
    </div>
  );
}
