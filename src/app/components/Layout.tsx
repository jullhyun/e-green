import { NavLink, Outlet, useLocation } from "react-router";
import { Menu, FileText, Send, UserCheck, Search } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { name: "송달관리", path: "/delivery", icon: <Send className="w-4 h-4" /> },
    { name: "공시송달", path: "/public-notification", icon: <FileText className="w-4 h-4" /> },
    { name: "방문수령", path: "/in-person", icon: <UserCheck className="w-4 h-4" /> },
    { name: "e송달결과정보조회", path: "/inquiry", icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full bg-[#1e3a8a] text-white shadow-md">
        <div className="flex items-center h-16 px-6">
          <div className="flex items-center gap-2 mr-10 font-bold text-xl tracking-tight">
            <Menu className="w-6 h-6" />
            <span>공시/송달 관리</span>
          </div>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-5 py-3 rounded-t-lg transition-colors font-medium text-[15px] ${
                    isActive
                      ? "bg-white text-[#1e3a8a] shadow-[0_-4px_0_0_#2563eb_inset]"
                      : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 bg-white min-h-[calc(100vh-64px)] shadow-sm">
        <Outlet />
      </main>
    </div>
  );
}