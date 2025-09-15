// pages/Profile.jsx
import { User, Mail, Phone, MapPin, Save, Edit, Shield, Lock, Key, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Profile() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, City, Country"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Profile saved:", profile);
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("profile")}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t("manage_your_profile_settings")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
        {[
          { id: "profile", label: t("profile_info"), icon: User },
          { id: "security", label: t("security"), icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Information */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("personal_information")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {t("update_your_personal_details")}
                </p>
              </div>
              
              {isEditing ? (
                <Button 
                  onClick={handleSave} 
                  className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t("save_changes")}
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t("edit_profile")}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t("full_name")}
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t("email_address")}
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t("phone_number")}
                </label>
                <Input
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t("address")}
                </label>
                <Input
                  value={profile.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl"
                />
              </div>
            </div>

            {/* Contact Info Preview */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t("contact_information")}</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{profile.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t("security_settings")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {t("manage_your_account_security")}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center">
                  <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{t("change_password")}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("update_your_password")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {t("change")}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center">
                  <Key className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{t("two_factor_authentication")}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("enable_2fa_for_extra_security")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {t("enable")}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <div className="flex items-center">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-100">{t("delete_account")}</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">{t("permanently_delete_your_account")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-100">
                  {t("delete")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}