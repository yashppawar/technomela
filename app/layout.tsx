import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalysisProvider } from "./context/AnalysisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TechnoMela",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AnalysisProvider>{children}</AnalysisProvider>
            </body>
        </html>
    );
}
