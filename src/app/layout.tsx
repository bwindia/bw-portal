import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Blood Warriors",
  description: "Empowering Thalassemia Aware Communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bwTheme">
      <body className={`${poppins.className} tracking-wide antialiased`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
