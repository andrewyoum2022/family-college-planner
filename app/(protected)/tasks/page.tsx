import { createClient } from "@/lib/supabase/server";
import LiveTasks from "@/components/LiveTasks";

export default async function TasksPage() {
  const supabase = await createClient();
  const { data: tasks } = await supabase.from("tasks").select("*").order("due_date", { ascending: true, nullsFirst: false });
  return (
    <>
      <div className="pageTitle"><div><div className="eyebrow">FAMILY WORKFLOW</div><h1>할 일</h1></div></div>
      <section className="card"><LiveTasks initialTasks={tasks ?? []}/></section>
    </>
  );
}
