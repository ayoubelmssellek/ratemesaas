// pages/dashboard/SettingsPanel.jsx
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../ui/cart/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useTranslation } from 'react-i18next';

export default function ConnectivitySettings() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('wifi'); // wifi | social
  const [wifi, setWifi] = useState({ ssid: '', password: '' });
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });
  const [saved, setSaved] = useState(false);

  const handleWifiChange = (key, value) => setWifi(prev => ({ ...prev, [key]: value }));
  const handleLinkChange = (key, value) => setSocialLinks(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    console.log('Saved WiFi:', wifi);
    console.log('Saved Social Links:', socialLinks);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('connectivitySettings.title')}</CardTitle>
        <div className="mt-2 flex space-x-4">
          <button
            className={`px-3 py-1 rounded ${activeTab === 'wifi' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('wifi')}
          >
            {t('connectivitySettings.tabs.wifi')}
          </button>
          <button
            className={`px-3 py-1 rounded ${activeTab === 'social' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('social')}
          >
            {t('connectivitySettings.tabs.social')}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 mt-4">
        {activeTab === 'wifi' && (
          <>
            <div>
              <label className="block mb-1 text-sm font-medium">{t('connectivitySettings.wifi.ssid')}</label>
              <Input
                value={wifi.ssid}
                onChange={(e) => handleWifiChange('ssid', e.target.value)}
                placeholder={t('connectivitySettings.wifi.ssidPlaceholder')}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{t('connectivitySettings.wifi.password')}</label>
              <Input
                type="password"
                value={wifi.password}
                onChange={(e) => handleWifiChange('password', e.target.value)}
                placeholder={t('connectivitySettings.wifi.passwordPlaceholder')}
              />
            </div>
          </>
        )}

        {activeTab === 'social' && (
          <>
            {Object.keys(socialLinks).map((key) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium capitalize">{t(`connectivitySettings.social.${key}`)}</label>
                <Input
                  value={socialLinks[key]}
                  onChange={(e) => handleLinkChange(key, e.target.value)}
                  placeholder={t('connectivitySettings.social.placeholder', { platform: key })}
                />
              </div>
            ))}
          </>
        )}

        <Button onClick={handleSave}>{t('connectivitySettings.saveButton')}</Button>
        {saved && <p className="text-green-500 text-sm mt-2">{t('connectivitySettings.savedMessage')}</p>}
      </CardContent>
    </Card>
  );
}
