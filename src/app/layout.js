//imports af egne komponenter
import "./globals.css";
import "./reset.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

//imports udefra
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "SMK - Statens Museum for Kunst",
  description: "SMK arrangement side",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="da">
        <body>
          <header>
            <Header />
            <ToastContainer className={"mt-14"} />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
