"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SchoolEditor({ school }: { school: any }) {
  const [form, setForm] = useState(school);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  const field = (name: string, label: string, type = "text") => (
    <label><span>{label}</span>
      <input type={type} value={form[name] ?? ""} onChange={e => setForm({ ...form, [name]: e.target.value })} />
    </label>
  );

  async function save() {
    const payload = {
      status: form.status,
      application_types: form.application_types,
      admissions_deadline: form.admissions_deadline || null,
      tuition_2026: form.tuition_2026 ? Number(form.tuition_2026) : null,
      room_board_2026: form.room_board_2026 ? Number(form.room_board_2026) : null,
      physics_notes: form.physics_notes,
      philosophy_notes: form.philosophy_notes,
      family_notes: form.family_notes,
      source_url: form.source_url,
      verified_at: form.verified_at || null
    };
    await supabase.from("schools").update(payload).eq("id", school.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="editor">
      <div className="formGrid">
        {field("status","지원 상태")}
        {field("application_types","지원 방식 (EA/ED/RD/UC 등)")}
        {field("admissions_deadline","대표 마감일","date")}
        {field("tuition_2026","2026–27 학비 (USD)","number")}
        {field("room_board_2026","2026–27 기숙사/식비 (USD)","number")}
        {field("verified_at","정보 검증일","date")}
      </div>
      <label><span>Physics 특징</span><textarea value={form.physics_notes ?? ""} onChange={e => setForm({...form,physics_notes:e.target.value})}/></label>
      <label><span>Philosophy 병행 메모</span><textarea value={form.philosophy_notes ?? ""} onChange={e => setForm({...form,philosophy_notes:e.target.value})}/></label>
      <label><span>가족 메모</span><textarea value={form.family_notes ?? ""} onChange={e => setForm({...form,family_notes:e.target.value})}/></label>
      {field("source_url","공식 출처 URL")}
      <button onClick={save}>{saved ? "저장됨 ✓" : "변경사항 저장"}</button>
    </div>
  );
}
