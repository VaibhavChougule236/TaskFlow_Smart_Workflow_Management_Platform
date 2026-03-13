import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar - Now receives toggle props */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Mobile Overlay - Closes sidebar when clicking outside */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Right Content - Margin adjusted for mobile */}
      <div className={`${isSidebarOpen ? "ml-0" : ""} lg:ml-64 flex flex-col min-h-screen transition-all duration-300`}>
        {/* Pass toggle function to Topbar */}
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;