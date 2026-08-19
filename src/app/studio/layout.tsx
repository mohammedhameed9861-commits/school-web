import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio — ثانوية الشرق",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
