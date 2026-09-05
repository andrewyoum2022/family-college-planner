import { createClient } from "@/lib/supabase/server";

export default async function TimelinePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("deadlines").select("*").order("deadline_date");
  return (
    <>
      <div className="pageTitle"><div><div className="eyebrow">CLASS OF 2027</div><h1>입시 일정</h1></div></div>
      <div className="timeline">
        {data?.map(d => (
          <div className="timelineItem" key={d.id}>
            <div className="timelineDate">{d.deadline_date}</div>
            <div className="card">
              <span className="pill">{d.category}</span>
              <h3>{d.title}</h3>
              <p>{d.notes}</p>
              {d.source_url && <a href={d.source_url} target="_blank" rel="noreferrer">공식 출처 ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
