'use client';

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { LoadingContext } from "../common/LoadingContext";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LoadingContext/>
      <Header onMenuClick={() => setSidebarOpen(v => !v)} />
      <div className="flex pt-12 h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex flex-col items-center justify-center min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
