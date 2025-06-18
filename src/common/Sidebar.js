import { FiMapPin, FiHome, FiFileText } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const menuItems = [
  { title: "Village", icon: FiMapPin, href: "/admin/village" },
  { title: "Houses", icon: FiHome, href: "/admin/houses" },
  { title: "Files", icon: FiFileText, href: "/admin/files" },
];

const SidebarItem = ({ title, icon: Icon, href, isActive }) => {
  return (
    <a
      href={href}
      className={`group flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-300 
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
        }`}
    >
      <Icon
        size={18}
        className={`transition-colors duration-300 ${
          isActive ? "text-white" : "text-slate-500 group-hover:text-blue-600"
        }`}
      />
      <span className="text-sm font-medium">{title}</span>
    </a>
  );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-screen w-[250px] bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          🏡 LOGO
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            {...item}
            isActive={location.pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
