import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Adnexa",
  description: "Adnexa is a smart investment and earning platform.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans" suppressHydrationWarning={true}>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer
          autoClose={2000}
          position="bottom-center"
          theme="colored"
        />

        {/* ────────── Live Chat Script ────────── */}
        {/* <script
          src="//code.tidio.co/c08duslbkgzjqdcpxevlusrfrisftby5.js"
          async
        /> */}
      </body>
    </html>
  );
}
