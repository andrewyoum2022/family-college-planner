import "./globals.css";

export const metadata = {
  title: "Family College Planner",
  description: "Private family college application planner"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
