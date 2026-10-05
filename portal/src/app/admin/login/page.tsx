import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getAdminUser()) redirect("/admin");
  return (
    <div className="mx-auto flex min-h-dvh max-w-md items-center px-4">
      <div className="card w-full p-7">
        <h1 className="text-xl">成果報酬ナビ 管理画面</h1>
        {isSupabaseConfigured ? (
          <LoginForm />
        ) : (
          <p className="mt-4 rounded-md bg-warn-50 p-4 text-sm leading-7 text-warn-700">
            Supabase が未設定のため、管理画面は利用できません（デモモード）。README の手順で環境変数を設定してください。
          </p>
        )}
      </div>
    </div>
  );
}
