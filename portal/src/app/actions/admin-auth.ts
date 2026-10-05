"use server";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth";
import { hasServiceRole, isSupabaseConfigured, serviceClient } from "@/lib/supabase";

export interface LoginState {
  error?: string;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured || !hasServiceRole) return { error: "Supabase の環境変数が設定されていません。" };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "メールアドレスとパスワードを入力してください。" };

  const supabase = await authClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { error: "メールアドレスまたはパスワードが正しくありません。" };

  const { data: admin } = await serviceClient().from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    return { error: "このアカウントには管理者権限がありません。admins テーブルへの登録が必要です。" };
  }
  redirect("/admin");
}

export async function logout() {
  if (isSupabaseConfigured) {
    const supabase = await authClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
