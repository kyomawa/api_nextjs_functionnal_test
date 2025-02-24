import { Sora } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

import "./globals.css";

// ========================================================================================================

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

// ========================================================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} font-sora antialiased bg-neutral-950 text-white `}>
        {children}
        <Toaster
          toastOptions={{
            className: "dark:bg-primary-900 bg-neutral-50 dark:text-white text-black",
          }}
        />
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-15">
          <Image fill src="/noise.png" alt="Noise" sizes="100vw" quality={100} />
        </div>
      </body>
    </html>
  );
}

// ========================================================================================================
