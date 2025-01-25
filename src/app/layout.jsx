import ProgressBarProvider from "@/components/proggress-bar-provider";
import web from "@/lib/config";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: web.title.toUpperCase(),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="./apple-icon.png" />
        <title>{web.title.toUpperCase()}</title>
      </head>
      <body className={inter.className}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  );
}
