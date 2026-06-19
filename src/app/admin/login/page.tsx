"use client";

import { useActionState } from "react";
import { signIn } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        action={action}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm"
      >
        <p className="script text-3xl text-terracotta">backoffice</p>
        <h1 className="mb-6 font-condensed text-3xl uppercase">Laura admin</h1>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </div>

        {state?.error && (
          <p className="mt-4 text-sm text-destructive">{state.error}</p>
        )}

        <Button type="submit" disabled={pending} className="mt-6 w-full">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </main>
  );
}
