import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";


export function App({ Component, pageProps }: AppProps) {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <Navbar />
      <main className="flex bg-[#f0f0fb] p-4">
        <Component {...pageProps} />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;