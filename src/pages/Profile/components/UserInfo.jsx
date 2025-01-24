import React, { useState } from 'react';
import { 
  User, Mail, MapPin, Calendar, Edit2, 
  GitHub, Twitter, LinkedIn, Save
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/auth/AuthContext';

const UserInfo = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    bio: user?.bio || '',
    github: user?.social?.github || '',
    twitter: user?.social?.twitter || '',
    linkedin: user?.social?.linkedin || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const InfoRow = ({ icon: Icon, label, value, name }) => (
    <div className="flex items-center space-x-4 py-2">
      <Icon className="h-5 w-5 text-text-muted" />
      <div className="flex-1">
        <p className="text-sm text-text-muted">{label}</p>
        {isEditing ? (
          <Input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="mt-1"
          />
        ) : (
          <p className="font-medium">{value || formData[name] || 'Not set'}</p>
        )}
      </div>
    </div>
  );

  const SocialLink = ({ icon: Icon, platform, username, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-text-muted hover:text-primary transition-colors"
    >
      <Icon className="h-5 w-5" />
      <span>{username || `Add ${platform}`}</span>
    </a>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile Information</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={loading}
        >
          {loading ? (
            'Saving...'
          ) : isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <InfoRow
            icon={User}
            label="Full Name"
            name="name"
            value={user?.name}
          />
          <InfoRow
            icon={Mail}
            label="Email"
            value={user?.email}
            // Email is not editable
          />
          <InfoRow
            icon={MapPin}
            label="Location"
            name="location"
            value={user?.location}
          />
          <InfoRow
            icon={Calendar}
            label="Member Since"
            value={new Date(user?.createdAt).toLocaleDateString()}
            // Join date is not editable
          />
        </div>

        {/* Bio */}
        <div>
          <p className="text-sm text-text-muted mb-2">Bio</p>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full min-h-[100px] p-3 rounded-md border border-border bg-background resize-none"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-sm">{formData.bio || 'No bio provided'}</p>
          )}
        </div>

        {/* Social Links */}
        <div>
          <p className="text-sm font-medium mb-4">Social Links</p>
          <div className="space-y-3">
            {isEditing ? (
              <>
                <Input
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="GitHub username"
                  icon={GitHub}
                />
                <Input
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="Twitter username"
                  icon={Twitter}
                />
                <Input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn profile URL"
                  icon={LinkedIn}
                />
              </>
            ) : (
              <div className="space-y-2">
                <SocialLink
                  icon={GitHub}
                  platform="GitHub"
                  username={formData.github}
                  url={`https://github.com/${formData.github}`}
                />
                <SocialLink
                  icon={Twitter}
                  platform="Twitter"
                  username={formData.twitter}
                  url={`https://twitter.com/${formData.twitter}`}
                />
                <SocialLink
                  icon={LinkedIn}
                  platform="LinkedIn"
                  username={formData.linkedin}
                  url={formData.linkedin}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;