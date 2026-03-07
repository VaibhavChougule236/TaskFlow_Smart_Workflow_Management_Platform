import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout({ children }) {

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AppLayout;