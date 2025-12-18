import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Listify",
  description: "Organize tasks and track to-dos for productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
