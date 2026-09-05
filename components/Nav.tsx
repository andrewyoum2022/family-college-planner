import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Nav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="nav">
      <div className="brand">🎓 Family College Planner</div>
      <div className="navlinks">
        <Link href="/">대시보드</Link>
        <Link href="/schools">학교</Link>
        <Link href="/tasks">할 일</Link>
        <Link href="/timeline">일정</Link>
        <Link href="/reference">입시 참고</Link>
      </div>
      <div className="user">{user?.email}</div>
    </nav>
  );
}
