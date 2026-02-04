import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { highlightBrand } from "@/lib/highlightBrand";
import InitialLoader from "@/components/InitialLoader";

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Highlight existing + newly added occurrences on the client.
    const observer = highlightBrand({ observe: true, root: document.body });
    // Re-run when route changes (client navigation)
    return () => observer?.disconnect?.();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <InitialLoader />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
