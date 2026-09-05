import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Nav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <nav className="nav">
      <Link href="/" className="brand">🎓 우리 가족 대학 플래너</Link>
      <div className="navlinks">
        <Link href="/">한눈에 보기</Link>
        <Link href="/schools">학교별 원서</Link>
        <Link href="/tasks">할 일</Link>
        <Link href="/timeline">입시 일정</Link>
        <Link href="/reference">입시 참고</Link>
      </div>
      <div className="user">{user?.email}</div>
    </nav>
  );
}
