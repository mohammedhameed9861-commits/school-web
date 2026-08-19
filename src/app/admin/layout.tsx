import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "لوحة الإدارة",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
