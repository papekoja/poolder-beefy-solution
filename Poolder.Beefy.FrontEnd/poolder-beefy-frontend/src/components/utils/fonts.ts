import { Geist, Geist_Mono, Montserrat, Montserrat_Alternates } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const monsterrat_alternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900", "100", "200"],
  display: "swap"
});

export const monsterrat= Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900", "100", "200"],
  display: "swap"
});