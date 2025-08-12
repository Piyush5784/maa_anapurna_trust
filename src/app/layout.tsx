import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

import SessionP from "@/components/Providers/Session";
import { Topbar } from "@/components/custom/topbar";
import { Toaster } from "sonner";
import AnalyticsTracker from "@/components/custom/AnalyticsTracker";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});
const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Donate Today | Make a Difference",
  description:
    "Support causes that matter. Quick, secure, and impactful donations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${InterFont.variable} overflow-x-hidden ${playfairDisplay.className} ${playfairDisplay.variable} ${InterFont.className} antialiased`}
      >
        <SessionP>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AnalyticsTracker />
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </SessionP>
      </body>
    </html>
  );
}
