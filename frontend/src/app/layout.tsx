import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./ui/components/layout/header";
import Footer from "./ui/components/layout/footer";
import Chatbot from "./ui/components/layout/chatbot";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvestMais - O Banco do Futuro",
  description: "InvestMais: Soluções inteligentes de investimento e crédito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main style={{ minHeight: '80vh', backgroundColor: '#000000' }}>
            {children}
          </main>
          <Chatbot />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
