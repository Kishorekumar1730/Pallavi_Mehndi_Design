import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pallavi Mehndi Artistry | Bespoke Bridal & Contemporary Henna",
  description: "Exquisite bespoke bridal, festive, and celebration henna artistry based in Salem, Tamil Nadu. 100% organic, natural Rajasthani henna cones.",
  keywords: ["Mehndi Artist Salem", "Bridal Mehndi Tamil Nadu", "Organic Henna", "Pallavi Mehndi Artistry", "Salem Wedding Henna"],
  openGraph: {
    title: "Pallavi Mehndi Artistry | Bespoke Bridal Henna",
    description: "Handcrafted organic bridal henna, bespoke storytelling motifs, and celebration mehndi in Salem & destination travel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-[#F4EADD] text-[#2B2421] font-sans selection:bg-[#C6A15B]/30 selection:text-[#8E3445] pb-16 md:pb-0">
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
