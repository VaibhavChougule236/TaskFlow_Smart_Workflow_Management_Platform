import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

function AppLayout({ children }) {

  return (

    <div className="bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="ml-64 flex flex-col min-h-screen">

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