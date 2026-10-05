"use client";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/admin-auth";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-5 space-y-4">
      <div>
        <label htmlFor="email" className="label">メールアドレス</label>
        <input id="email" name="email" type="email" required autoComplete="username" className="input" />
      </div>
      <div>
        <label htmlFor="password" className="label">パスワード</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="input" />
      </div>
      {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">{pending ? "ログイン中…" : "ログイン"}</button>
    </form>
  );
}
