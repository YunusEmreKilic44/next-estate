import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RegisterModal from "@/components/Modals/RegisterModal";
import LoginModal from "@/components/Modals/LoginModal";
import CreatePropertyModal from "@/components/Modals/CreatePropertyModal";
import FilterModal from "@/components/Modals/FilterModal";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Next Estate",
  description: "Next Estate Tutorial",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        {children}
        <RegisterModal />
        <LoginModal />
        <CreatePropertyModal />
        <FilterModal />
        <Toaster />
      </body>
    </html>
  );
}
