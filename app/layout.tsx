import "./globals.css";
import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";

const comicNeue = Comic_Neue({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "KidsChat - Fun & Safe Chatbot for Kids! 🤖",
  description: "A magical place where kids can chat with friendly AI, play games, and learn new things safely!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={`${comicNeue.className} bg-gradient-to-br from-kid-turquoise/20 to-kid-coral/20 min-h-screen`}>
          {children}
        </body>
    </html>
  );
}