import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SchoolEditor from "@/components/SchoolEditor";

const money=(n:any)=>n?`$${Number(n).toLocaleString()}`:"확인 중";
export default async function SchoolDetail({params}:{params:Promise<{id:string}>}){
 const{id}=await params;const supabase=await createClient();const{data:school}=await supabase.from("schools").select("*").eq("id",id).single();if(!school)notFound();
 const total=(school.tuition_2026&&school.room_board_2026)?Number(school.tuition_2026)+Number(school.room_board_2026):null;
 return <><Link className="more" href="/schools">← Physics Top 50</Link>
 <div className="schoolHero"><div className="rankBig">#{school.rank}</div><div><div className="eyebrow">PHYSICS CANDIDATE · FALL 2027</div><h1>{school.name}</h1><p>{school.location||"위치 정보 확인 필요"}</p></div></div>
 <div className="schoolFacts"><div><span>지원 방식</span><strong>{school.application_types||"확인 중"}</strong></div><div><span>대표 마감일</span><strong>{school.admissions_deadline||"확인 중"}</strong></div><div><span>2026–27 학비</span><strong>{money(school.tuition_2026)}</strong></div><div><span>기숙사 + 식비</span><strong>{money(school.room_board_2026)}</strong></div><div><span>직접비 단순합계</span><strong>{total?money(total):"확인 중"}</strong></div><div><span>정보 검증일</span><strong>{school.verified_at||"검증 필요"}</strong></div></div>
 <div className="schoolInfoGrid"><section className="card infoCard"><div className="infoIcon">⚛</div><div><div className="eyebrow">ACADEMICS</div><h2>Physics</h2><p>{school.physics_notes||"Physics 커리큘럼, 학부 연구, 세부 분야 정보를 공식 자료로 확인해 추가할 예정입니다."}</p></div></section><section className="card infoCard"><div className="infoIcon">Φ</div><div><div className="eyebrow">SECOND FIELD</div><h2>Philosophy 병행</h2><p>{school.philosophy_notes||"복수전공·부전공·joint program 가능 여부와 Philosophy of Science 관련 과목을 확인해 추가할 예정입니다."}</p></div></section></div>
 <section className="card familyCard"><div className="sectionHead"><div><div className="eyebrow">FAMILY VIEW</div><h2>우리 가족 메모</h2></div><span className="pill">{school.status||"Not decided"}</span></div><p>{school.family_notes||"아직 가족 메모가 없습니다. 아래 편집 영역에서 학교의 장단점, 방문 소감, 지원 전략을 기록하세요."}</p></section>
 {school.source_url&&<div className="sourceStrip"><div><strong>공식 자료</strong><span>최신 정보는 학교 공식 페이지를 기준으로 확인합니다.</span></div><a href={school.source_url} target="_blank" rel="noreferrer">공식 페이지 열기 ↗</a></div>}
 <section className="card editCard"><div className="sectionHead"><div><div className="eyebrow">FAMILY EDIT</div><h2>정보 · 메모 공동 편집</h2></div></div><SchoolEditor school={school}/></section></>}
