//imports af egne komponenter
import "./globals.css";
import "./reset.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Head from "./head";

//imports udefra
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "SMK - Statens Museum for Kunst",
  description: "SMK arrangement side",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="da">
        <Head>
          <meta charSet="UTF-8" />
        </Head>
        <body>
          <header>
            <Header />
            <ToastContainer />
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
