import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL('https://pallavi-mehndi-artistry.netlify.app'),
  title: {
    default: "Pallavi Mehndi Artistry | Bespoke Bridal & Contemporary Henna",
    template: "%s | Pallavi Mehndi Artistry",
  },
  description: "Exquisite bespoke bridal, festive, and celebration henna artistry based in Salem, Tamil Nadu. Handcrafted with 100% natural, chemical-free organic Rajasthani henna cones.",
  keywords: ["Mehndi Artist Salem", "Bridal Mehndi Tamil Nadu", "Organic Henna", "Pallavi Mehndi Artistry", "Salem Wedding Henna", "Rajasthani Henna Salem", "Contemporary Bridal Henna"],
  authors: [{ name: "Pallavi Devi" }],
  creator: "Pallavi Mehndi Artistry",
  publisher: "Pallavi Mehndi Artistry",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pallavi Mehndi Artistry | Bespoke Bridal & Contemporary Henna",
    description: "Exquisite bespoke bridal, festive, and celebration henna artistry based in Salem, Tamil Nadu. Handcrafted with 100% natural, chemical-free organic Rajasthani henna cones.",
    url: "https://pallavi-mehndi-artistry.netlify.app",
    siteName: "Pallavi Mehndi Artistry",
    images: [
      {
        url: "/images/hero-artist-portrait.jpg",
        width: 680,
        height: 880,
        alt: "Pallavi - Lead Bridal Mehndi Artist & Founder, Salem",
      },
      {
        url: "/images/hero-mehndi-arm.jpg",
        width: 650,
        height: 867,
        alt: "Authentic Bridal Mehndi Linework by Pallavi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pallavi Mehndi Artistry | Bespoke Bridal & Contemporary Henna",
    description: "Exquisite bespoke bridal, festive, and celebration henna artistry based in Salem, Tamil Nadu. Handcrafted with 100% natural organic henna.",
    images: ["/images/hero-artist-portrait.jpg"],
    creator: "@salem_mehandi_artist_pallavi",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-[#F4EADD] text-[#2B2421] font-sans selection:bg-[#C6A15B]/30 selection:text-[#8E3445]">
        {children}
      </body>
    </html>
  );
}
