import React from "react";
import { signUpAction } from "@/app/(auth-pages)/actions";
import Link from "next/link";
import FormMessage from "@/components/molecules/FormMessage";
import Input from "@/components/atoms/Input";
import FormSubmitButton from "@/components/molecules/FormSubmitButton";
import { Message } from "@/utils/types";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <label htmlFor="email">Email</label>
          <Input
            size="lg"
            name="email"
            placeholder="you@example.com"
            color={
              "error" in searchParams && searchParams.error
                ? "danger"
                : "default"
            }
            required
          />
          <label htmlFor="password">Password</label>
          <Input
            size="lg"
            type="password"
            name="password"
            placeholder="Your password"
            color={
              "error" in searchParams && searchParams.error
                ? "danger"
                : "default"
            }
            minLength={6}
            required
          />
          <FormSubmitButton
            pendingText="Signing up..."
            formAction={signUpAction}
          >
            Sign up
          </FormSubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
