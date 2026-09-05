import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SchoolEditor from "@/components/SchoolEditor";

export default async function SchoolDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: school } = await supabase.from("schools").select("*").eq("id", id).single();
  if (!school) notFound();

  return (
    <>
      <div className="schoolHero">
        <div className="rankBig">#{school.physics_rank}</div>
        <div>
          <div className="eyebrow">PHYSICS CANDIDATE</div>
          <h1>{school.name}</h1>
          <p>{school.city}, {school.state}</p>
        </div>
      </div>
      <section className="card">
        <h2>학교 정보 · 가족 공동 편집</h2>
        <SchoolEditor school={school} />
      </section>
    </>
  );
}
