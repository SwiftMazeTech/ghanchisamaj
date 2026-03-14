import "./globals.css";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";
import { defaultSiteContent } from "../data/siteContent";

export const metadata = {
  title: defaultSiteContent.orgName,
  description: defaultSiteContent.shortIntro,
  icons: {
    icon: "/favicon-clean.png?v=2",
    shortcut: "/favicon-clean.png?v=2",
    apple: "/favicon-clean.png?v=2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          <main className="page-shell">{children}</main>
          <FloatingWhatsApp />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
