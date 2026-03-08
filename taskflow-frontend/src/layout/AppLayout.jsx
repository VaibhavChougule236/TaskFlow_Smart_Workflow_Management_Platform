import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex flex-col flex-1">

        <Topbar />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default AppLayout;