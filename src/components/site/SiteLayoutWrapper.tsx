"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { ParticleBackground } from "./ParticleBackground";
import { LoadingScreen } from "./LoadingScreen";

interface SiteLayoutWrapperProps {
  children: React.ReactNode;
}

export const SiteLayoutWrapper: React.FC<SiteLayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen />
      <Header />
      <ParticleBackground />
      <main className="flex-grow pt-[72px] lg:pt-[80px]">{children}</main>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
};
