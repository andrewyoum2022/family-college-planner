import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LiveTasks from "@/components/LiveTasks";

export default async function Dashboard() {
  const supabase = await createClient();

  const [{ data: tasks }, { data: schools }, { data: deadlines }] = await Promise.all([
    supabase.from("tasks").select("*").neq("status", "done").order("due_date", { ascending: true, nullsFirst: false }).limit(8),
    supabase.from("schools").select("id,name,physics_rank,status,city,state").order("physics_rank").limit(10),
    supabase.from("deadlines").select("*").gte("date", new Date().toISOString().slice(0,10)).order("date").limit(6)
  ]);

  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">TORREY PINES HIGH SCHOOL · SENIOR</div>
          <h1>College Application Command Center</h1>
          <p>Physics 중심 지원 · Philosophy 복수전공/부전공 가능성 함께 검토</p>
        </div>
        <div className="heroStat"><strong>50</strong><span>Physics 후보 대학</span></div>
      </section>

      <div className="grid3">
        <section className="card">
          <h2>다가오는 일정</h2>
          {deadlines?.map(d => (
            <div className="deadline" key={d.id}>
              <div className="dateBadge">{d.date?.slice(5)}</div>
              <div><strong>{d.title}</strong><small>{d.category}</small></div>
            </div>
          ))}
          <Link className="more" href="/timeline">전체 일정 →</Link>
        </section>

        <section className="card span2">
          <h2>가족 할 일</h2>
          <LiveTasks initialTasks={tasks ?? []} />
          <Link className="more" href="/tasks">전체 할 일 →</Link>
        </section>
      </div>

      <section className="card">
        <div className="sectionHead"><h2>Physics 후보 대학</h2><Link href="/schools">50개 전체 보기 →</Link></div>
        <div className="schoolGrid">
          {schools?.map(s => (
            <Link className="schoolMini" key={s.id} href={`/schools/${s.id}`}>
              <span className="rank">#{s.physics_rank}</span>
              <strong>{s.name}</strong>
              <small>{s.city}, {s.state}</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
