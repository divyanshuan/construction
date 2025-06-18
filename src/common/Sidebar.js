import { FiMapPin, FiHome, FiFileText } from "react-icons/fi";

const menuItems = [
  { title: "Village", icon: FiMapPin, href: "/admin/village" },
  { title: "Houses", icon: FiHome, href: "/admin/houses" },
  { title: "Files", icon: FiFileText, href: "/admin/files" },
];
const SidebarItem = ({ title, icon: Icon, href }) => {
  const isActive = false; // You can hook this to router logic

  return (
    <a
      href={href}
      className={`group flex items-center gap-3 rounded px-4 py-2 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 md:px-5 ${
        isActive
          ? "bg-blue-100 font-medium text-blue-600"
          : "font-normal text-slate-500"
      }`}
    >
      <Icon
        size={18}
        className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300"
      />
      <h3 className="text-sm leading-4">{title}</h3>
    </a>
  );
};

const SidebarSection = ({ title, items }) => (
  <>
    {items.map((item, idx) => (
      <SidebarItem key={idx} {...item} />
    ))}
  </>
);

const Sidebar = () => {
  return (
    <aside className="h-screen min-w-[220px] max-w-[240px] bg-slate-100 shadow-md">
      <h1 className="mt-6 pl-10 text-xl font-bold text-blue-600 tracking-wide">
        LOGO
      </h1>
      <nav className="p-5">
        <SidebarSection title="Menu" items={menuItems} />
      </nav>
    </aside>
  );
};

export default Sidebar;
