// AdminHeader.jsx
import { Menu, Bell, Search, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="flex-shrink-0 border-b border-border bg-background">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="relative ml-4 hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Select */}
          <select
            onChange={handleChangeLanguage}
            value={i18n.language}
            className="border border-border rounded px-2 py-1 text-sm bg-background"
          >
            <option value="ar">AR</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <div className="font-medium">Admin User</div>
              <div className="text-sm text-muted-foreground">Business Owner</div>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
