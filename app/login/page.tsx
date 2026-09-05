"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function signIn() {
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });
  }

  return (
    <main className="login">
      <div className="loginCard">
        <div className="logo">🎓</div>
        <h1>Family College Planner</h1>
        <p>Torrey Pines High School · Class of 2027</p>
        <p className="muted">Physics 전공 · Philosophy 복수전공/부전공 고려</p>
        <button onClick={signIn}>Google로 로그인</button>
        <small>승인된 가족 계정만 데이터에 접근할 수 있습니다.</small>
      </div>
    </main>
  );
}
