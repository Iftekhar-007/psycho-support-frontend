// app/sign-up/page.tsx

import { SignUpForm } from "@/components/sign-up-form";

const SignUpPage = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center py-16">
      <div className="w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light tracking-tight text-[#0f1f1c]">
            Create an account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Start your journey with us today.
          </p>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPage;
