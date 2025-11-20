import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <main
      className="  min-h-screen bg-white 
dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
text-linear-900 dark:text-white
text-slate-600  "
    >
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
export default App;
