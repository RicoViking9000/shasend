import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeWrapper } from "./theme";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { AuthProvider } from "./lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shasend",
  description: "Encrypted messaging application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <AuthProvider> */}
        <ThemeWrapper>
          <CssBaseline>
            <body className={inter.className}>{children}</body>
          </CssBaseline>
        </ThemeWrapper>
      {/* </AuthProvider> */}
    </html>
  );
}
