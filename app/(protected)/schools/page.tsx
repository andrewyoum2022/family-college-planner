import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function SchoolsPage() {
  const supabase = await createClient();
  const { data: schools } = await supabase
    .from("schools")
    .select("*")
    .order("rank");

  return (
    <>
      <div className="pageTitle">
        <div><div className="eyebrow">2027 NICHE · PHYSICS</div><h1>Physics Top 50</h1></div>
        <p>학비/기숙사비·마감일은 학교 공식 자료의 출처 URL과 검증일을 함께 관리합니다.</p>
      </div>
      <div className="tableWrap">
        <table>
          <thead><tr><th>Rank</th><th>학교</th><th>위치</th><th>지원</th><th>학비</th><th>기숙사/식비</th><th>상태</th></tr></thead>
          <tbody>
            {schools?.map(s => (
              <tr key={s.id}>
                <td>#{s.rank}</td>
                <td><Link href={`/schools/${s.id}`}><strong>{s.name}</strong></Link></td>
                <td>{s.location}</td>
                <td>{s.application_types ?? "—"}</td>
                <td>{s.tuition_2026 ? `$${Number(s.tuition_2026).toLocaleString()}` : "검증 필요"}</td>
                <td>{s.room_board_2026 ? `$${Number(s.room_board_2026).toLocaleString()}` : "검증 필요"}</td>
                <td><span className="pill">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
