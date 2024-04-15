import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeWrapper } from "./theme";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shasend",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeWrapper>
        <CssBaseline>
          <body className={inter.className}>{children}</body>
        </CssBaseline>
      </ThemeWrapper>
    </html>
  );
}
