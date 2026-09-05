import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SchoolEditor from "@/components/SchoolEditor";
export default async function SchoolDetail({params}:{params:Promise<{id:string}>}){const{id}=await params;const supabase=await createClient();const{data:school}=await supabase.from("schools").select("*").eq("id",id).single();if(!school)notFound();return <><Link className="more" href="/schools">← Physics Top 50</Link><div className="schoolHero"><div className="rankBig">#{school.rank}</div><div><div className="eyebrow">PHYSICS CANDIDATE</div><h1>{school.name}</h1><p>{school.location||"위치 정보 확인 필요"}</p></div></div><section className="card"><div className="sectionHead"><h2>학교 정보 · 가족 공동 편집</h2><span className="pill">{school.status||"Not decided"}</span></div><SchoolEditor school={school}/></section></>}
