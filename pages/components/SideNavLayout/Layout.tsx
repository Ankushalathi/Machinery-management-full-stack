import { useState } from "react";
// import { FiMenu, FiX, FiHome, FiDatabase, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { IconDatabase, IconFileX, IconHome, IconMenu, IconUser } from "@tabler/icons-react";

const NavItem = ({ href, icon, title }: { href: string; icon: any; title: string }) => {
  return (
    <Link href={href} className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-md">
      <span className="text-xl">{icon}</span>
      <span className="text-lg">{title}</span>
    </Link>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transition-all duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:w-72`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <IconFileX className="md:hidden cursor-pointer text-2xl" onClick={toggleSidebar} />
      </div>

      <nav className="space-y-4">
        <NavItem href="/" icon={<IconHome />} title="Dashboard" />
        <NavItem href="/machinery-list" icon={<IconDatabase />} title="Machinery Listing" />
        <NavItem href="/labour-data" icon={<IconUser />} title="Labour Data" />
      </nav>
    </div>
  );
};


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-white md:p-0 p-2 md:ml-72 transition-all duration-300">
        <header className="md:hidden  flex justify-between items-center bg-white p-4 shadow-md ">
          <IconMenu className="md:hidden text-2xl cursor-pointer" onClick={() => setSidebarOpen(true)} />
        </header>

        {children}
      </div>
    </div>
  );
};

export default Layout;
