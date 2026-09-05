import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function SchoolsPage() {
  const supabase = await createClient();
  const { data: schools } = await supabase.from("schools").select("*").order("rank");
  return <><div className="pageTitle"><div><div className="eyebrow">2027 NICHE · PHYSICS</div><h1>Physics Top 50</h1></div><p>학교 이름을 누르면 지원 방식, 비용, Physics·Philosophy 메모를 가족이 함께 편집할 수 있습니다.</p></div><div className="tableWrap"><table><thead><tr><th>순위</th><th>학교</th><th>위치</th><th>지원 방식</th><th>학비</th><th>기숙사/식비</th><th>상태</th></tr></thead><tbody>{schools?.map(s => <tr key={s.id}><td><strong>#{s.rank}</strong></td><td><Link href={`/schools/${s.id}`}><strong>{s.name}</strong></Link></td><td>{s.location || "—"}</td><td>{s.application_types || "확인 필요"}</td><td>{s.tuition_2026 ? `$${Number(s.tuition_2026).toLocaleString()}` : "검증 필요"}</td><td>{s.room_board_2026 ? `$${Number(s.room_board_2026).toLocaleString()}` : "검증 필요"}</td><td><span className="pill">{s.status || "Not decided"}</span></td></tr>)}</tbody></table></div></>;
}
