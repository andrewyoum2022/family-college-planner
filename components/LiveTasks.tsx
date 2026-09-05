"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Task = {
  id: string;
  title: string;
  category: string;
  due_date: string | null;
  status: string;
  owner: string | null;
  notes: string | null;
};

export default function LiveTasks({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const supabase = createClient();

  async function refresh() {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("due_date", { ascending: true, nullsFirst: false });
    if (data) setTasks(data);
  }

  useEffect(() => {
    const channel = supabase
      .channel("tasks-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, refresh)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await supabase.from("tasks").insert({ title: title.trim(), category: "Family", status: "todo" });
    setTitle("");
    await refresh();
  }

  async function toggle(task: Task) {
    await supabase.from("tasks").update({
      status: task.status === "done" ? "todo" : "done"
    }).eq("id", task.id);
    await refresh();
  }

  return (
    <div>
      <form className="quickAdd" onSubmit={addTask}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="새 할 일 추가…" />
        <button>추가</button>
      </form>
      <div className="taskList">
        {tasks.map(task => (
          <button key={task.id} className={`task ${task.status === "done" ? "done" : ""}`} onClick={() => toggle(task)}>
            <span className="check">{task.status === "done" ? "✓" : "○"}</span>
            <span>
              <strong>{task.title}</strong>
              <small>{task.category} · {task.due_date ?? "날짜 미정"} {task.owner ? `· ${task.owner}` : ""}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
