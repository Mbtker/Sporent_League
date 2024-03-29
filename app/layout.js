import { Almarai } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata = {
  title: "سبورنت - Sporent",
  description: "Spornet .. Live your entire sports world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={almarai.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
