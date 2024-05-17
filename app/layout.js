import { Chivo } from "next/font/google";
import "./globals.css";
import BackToTopButton from "./_components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import ComparisionSheet from "./_components/ComparisionSheet";

const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});
export const metadata = {
  title: "Taze Piyasa | Lezzet Rehberi",
  description: "Generated by Ali Yorulmaz with love and coffee.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={chivo.variable}>
          {children}
          <Toaster />
          <BackToTopButton />
        </body>
      </html>
    </>
  );
}
