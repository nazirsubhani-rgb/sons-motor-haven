import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Car,
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Car, label: "Vehicles", href: "/admin/vehicles" },
    { icon: MessageSquare, label: "Enquiries", href: "/admin/enquiries" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-secondary min-h-screen flex flex-col">
      <div className="p-6 border-b border-charcoal-light">
        <h1 className="text-lg font-display font-bold text-secondary-foreground">
          WM & Sons
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-gold text-secondary"
                : "text-muted-foreground hover:bg-charcoal-light hover:text-secondary-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-charcoal-light space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-charcoal-light hover:text-secondary-foreground transition-colors"
        >
          <Home className="w-5 h-5" />
          View Website
        </Link>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-charcoal-light hover:text-secondary-foreground transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
