import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasServiceRole, isSupabaseConfigured, serviceClient } from "./supabase";

/** ログインセッション用クライアント（Cookie 経由）。管理画面の認証にのみ使用 */
export async function authClient() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server Component からの呼び出しでは Cookie を書けない（proxy.ts がセッション更新を担当）
        }
      },
    },
  });
}

export interface AdminUser {
  id: string;
  email: string | undefined;
}

/** ログイン済み かつ admins テーブルに登録されているユーザーのみ返す */
export async function getAdminUser(): Promise<AdminUser | null> {
  if (!isSupabaseConfigured || !hasServiceRole) return null;
  const supabase = await authClient();
  const { data } = await supabase.auth.getUser(); // JWT をサーバーで検証する
  const user = data.user;
  if (!user) return null;
  const { data: row } = await serviceClient().from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  return row ? { id: user.id, email: user.email } : null;
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");
  return admin;
}
