import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/provider";
import { ThemeProvider } from "next-themes";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400"],
  variable: "--font-geist-cormorant-garamond",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "samedyhunx.tech",
  description: "Your Favorite Tech Blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={`${cormorantGaramond.variable} ${poppins.variable} `}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
