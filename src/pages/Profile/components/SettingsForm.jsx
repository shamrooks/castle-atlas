import React, { useState } from 'react';
import { Bell, Moon, Globe, Lock, Shield, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      updates: false,
      newsletter: true,
    },
    appearance: {
      theme: 'system', // 'light', 'dark', 'system'
      fontSize: 'medium', // 'small', 'medium', 'large'
      reduceMotion: false,
    },
    privacy: {
      profileVisibility: 'public', // 'public', 'private', 'friends'
      showProgress: true,
      showActivity: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '24h', // '1h', '24h', '7d', 'never'
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSelect = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SettingToggle = ({ category, setting, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{label}</p>
        {description && (
          <p className="text-sm text-text-muted">{description}</p>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={settings[category][setting]}
          onChange={() => handleToggle(category, setting)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-surface-hover rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
    </div>
  );

  const SettingSelect = ({ category, setting, label, options }) => (
    <div className="flex items-center justify-between py-3">
      <p className="font-medium">{label}</p>
      <select
        value={settings[category][setting]}
        onChange={(e) => handleSelect(category, setting, e.target.value)}
        className="rounded-md border border-border bg-background px-3 py-1 text-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <SettingToggle
            category="notifications"
            setting="email"
            label="Email Notifications"
            description="Receive email updates about your progress"
          />
          <SettingToggle
            category="notifications"
            setting="push"
            label="Push Notifications"
            description="Get notified about achievements and reminders"
          />
          <SettingToggle
            category="notifications"
            setting="updates"
            label="Platform Updates"
            description="Stay informed about new features and improvements"
          />
          <SettingToggle
            category="notifications"
            setting="newsletter"
            label="Newsletter"
            description="Receive our monthly newsletter with learning tips"
          />
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Moon className="h-5 w-5 text-primary" />
            <CardTitle>Appearance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <SettingSelect
            category="appearance"
            setting="theme"
            label="Theme"
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
          <SettingSelect
            category="appearance"
            setting="fontSize"
            label="Font Size"
            options={[
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
            ]}
          />
          <SettingToggle
            category="appearance"
            setting="reduceMotion"
            label="Reduce Motion"
            description="Minimize animations and transitions"
          />
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Privacy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <SettingSelect
            category="privacy"
            setting="profileVisibility"
            label="Profile Visibility"
            options={[
              { value: 'public', label: 'Public' },
              { value: 'private', label: 'Private' },
              { value: 'friends', label: 'Friends Only' },
            ]}
          />
          <SettingToggle
            category="privacy"
            setting="showProgress"
            label="Show Progress"
            description="Allow others to see your learning progress"
          />
          <SettingToggle
            category="privacy"
            setting="showActivity"
            label="Show Activity"
            description="Display your recent learning activities"
          />
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <SettingToggle
            category="security"
            setting="twoFactorAuth"
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          />
          <SettingSelect
            category="security"
            setting="sessionTimeout"
            label="Session Timeout"
            options={[
              { value: '1h', label: '1 Hour' },
              { value: '24h', label: '24 Hours' },
              { value: '7d', label: '7 Days' },
              { value: 'never', label: 'Never' },
            ]}
          />
        </CardContent>
      </Card>

      {/* Status and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          {error && (
            <Alert variant="error" icon={AlertCircle}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              Settings saved successfully!
            </Alert>
          )}
        </div>
        <Button
          onClick={handleSave}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsForm;