import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) redirect("/login");

  const { data: member } = await supabase
    .from("family_members")
    .select("email,display_name")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (!member) {
    await supabase.auth.signOut();
    redirect("/login?unauthorized=1");
  }

  return (
    <>
      <Nav />
      <main className="container">{children}</main>
    </>
  );
}
