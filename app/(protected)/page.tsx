import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LiveTasks from "@/components/LiveTasks";

export default async function Dashboard() {
  const supabase = await createClient();
  const [{ data: tasks }, { data: schools }, { data: deadlines }] = await Promise.all([
    supabase.from("tasks").select("*").eq("completed", false).order("due_date", { ascending: true, nullsFirst: false }),
    supabase.from("schools").select("id,name,rank,status,location").order("rank"),
    supabase.from("deadlines").select("*").gte("deadline_date", new Date().toISOString().slice(0,10)).order("deadline_date")
  ]);
  const openTasks = tasks ?? [];
  const allSchools = schools ?? [];
  const upcoming = deadlines ?? [];
  return (
    <>
      <section className="hero"><div><div className="eyebrow">TORREY PINES HIGH SCHOOL · CLASS OF 2027</div><h1>우리 가족 미국 대학 원서 플래너</h1><p>물리학 + 철학을 향해, 가족이 함께 준비하는 지원 여정</p></div><div className="heroStat"><strong>2027</strong><span>Fall Admission</span></div></section>
      <section className="statusbar"><div className="stat"><strong>{allSchools.length}</strong><span>Physics 후보 대학</span></div><div className="stat"><strong>{openTasks.length}</strong><span>남은 할 일</span></div><div className="stat"><strong>{upcoming[0]?.deadline_date?.slice(5) ?? "—"}</strong><span>가장 가까운 일정</span></div></section>
      <div className="grid3">
        <section className="card"><div className="sectionHead"><h2>다가오는 일정</h2><Link href="/timeline">전체 보기 →</Link></div>{upcoming.slice(0,5).map(d => <div className="deadline" key={d.id}><div className="dateBadge">{d.deadline_date?.slice(5)}</div><div><strong>{d.title}</strong><small>{d.category}</small></div></div>)}{!upcoming.length && <p className="muted">등록된 일정이 없습니다.</p>}</section>
        <section className="card span2"><div className="sectionHead"><h2>이번 주 할 일</h2><Link href="/tasks">전체 보기 →</Link></div><LiveTasks initialTasks={openTasks.slice(0,7)} /></section>
      </div>
      <section className="card"><div className="sectionHead"><div><h2>Physics Top 10</h2><span className="muted">후보 대학을 눌러 지원 정보와 가족 메모를 관리하세요.</span></div><Link href="/schools">50개 전체 보기 →</Link></div><div className="schoolGrid">{allSchools.slice(0,10).map(s => <Link className="schoolMini" key={s.id} href={`/schools/${s.id}`}><span className="rank">#{s.rank}</span><strong>{s.name}</strong><small>{s.location}</small></Link>)}</div></section>
    </>
  );
}
