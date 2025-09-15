// AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard, 
  QrCode, 
  Star, 
  BarChart3, 
  Wifi, 
  Share2, 
  Settings,
  X,
  Home,
  MessageSquare,
  PieChart,
  Network,
  Bell,
  User,
  LogOut
} from "lucide-react";
import { useState } from "react";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { t } = useTranslation();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navigation = [
    { 
      name: t("dashboard"), 
      href: "/dashboard", 
      icon: LayoutDashboard,
      exact: true
    },
    { 
      name: t("qrCode.qrCode"), 
      href: "/dashboard/qr-codes", 
      icon: QrCode 
    },
    { 
      name: t("reviews"), 
      href: "/dashboard/reviews", 
      icon: Star 
    },
    { 
      name: t("analytics"), 
      href: "/dashboard/analytics", 
      icon: BarChart3 
    },
       { 
      name: t("connectivitySettings.title"), 
      href: "/dashboard/connectivity-settings",
      icon: Share2
    }
    
  ];


  const isActive = (href, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const toggleSubmenu = (itemName) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">ReviewFlow</span>
              <p className="text-xs text-gray-400">Business Suite</p>
            </div>
          </div>
          <button 
            className="lg:hidden p-1 hover:bg-gray-700 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {t("main_navigation")}
            </h3>
            
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                const hasSubmenu = item.submenu;
                
                return (
                  <div key={item.href}>
                    <Link
                      to={hasSubmenu ? '#' : item.href}
                      onClick={() => hasSubmenu && toggleSubmenu(item.name)}
                      className={`
                        flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                        ${active 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      
                      {hasSubmenu && (
                        <svg 
                          className={`w-4 h-4 transform transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    {hasSubmenu && activeSubmenu === item.name && (
                      <div className="ml-8 mt-2 space-y-2 pl-4 border-l border-gray-700">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const subActive = isActive(subItem.href);
                          
                          return (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className={`
                                flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-sm
                                ${subActive 
                                  ? "text-blue-400 bg-blue-900/20" 
                                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                                }
                              `}
                            >
                              <SubIcon className="w-4 h-4 mr-2" />
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        
        </nav>

     
      </aside>
    </>
  );
}