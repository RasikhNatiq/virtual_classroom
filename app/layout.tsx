import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { ToastViewport } from "@/components/ui/ToastViewport";
import { AppProviders } from "@/store/app-providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virtual Classroom Attendance",
  description: "Modern virtual classroom attendance system with role-based dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>
          {children}
          <ToastViewport />
        </AppProviders>
      </body>
    </html>
  );
}
