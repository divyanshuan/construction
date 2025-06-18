import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1  overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
