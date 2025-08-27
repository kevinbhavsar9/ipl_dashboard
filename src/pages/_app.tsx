import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { ToastContainer } from "react-toastify";

export function App({ Component, pageProps }: AppProps) {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <Navbar />
      <main className="flex bg-[#f0f0fb] py-4 px-8 overflow-hidden">
        <Component {...pageProps} />
      </main>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
