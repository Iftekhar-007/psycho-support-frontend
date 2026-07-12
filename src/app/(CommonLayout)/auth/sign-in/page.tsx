// app/sign-in/page.tsx

import { SignInForm } from "@/components/sign-in-form";

const SignInPage = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center py-16">
      <div className="w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light tracking-tight text-[#0f1f1c]">
            Welcome back
          </h1>
          <p className="mt-2 text-muted-foreground">Sign in to continue.</p>
        </div>
        <SignInForm />
      </div>
    </section>
  );
};

export default SignInPage;
