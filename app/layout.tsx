import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReThread by Precious Ajilore",
  description: "A closet giveaway app built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      style={{ colorScheme: "only light" }}
    >
      <body className="min-h-full flex flex-col bg-[#f2efea] text-[#141414]">
        {children}
      </body>
    </html>
  );
}
