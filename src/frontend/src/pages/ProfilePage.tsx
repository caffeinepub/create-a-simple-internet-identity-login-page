import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Upload, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePageProps {
  onClose: () => void;
}

interface ProfileData {
  name: string;
  dob: string;
  gender: string;
  imagePreview: string | null;
}

const PROFILE_STORAGE_KEY = 'ocean_profile_data';

export default function ProfilePage({ onClose }: ProfilePageProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load profile data from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (savedProfile) {
        const profileData: ProfileData = JSON.parse(savedProfile);
        
        // Validate the parsed data has expected shape
        if (profileData && typeof profileData === 'object') {
          setName(profileData.name || '');
          setDob(profileData.dob || '');
          setGender(profileData.gender || '');
          setImagePreview(profileData.imagePreview || null);
        }
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      // Clear corrupted data
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      const profileData: ProfileData = {
        name,
        dob,
        gender,
        imagePreview,
      };

      // Save to localStorage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
      
      toast.success('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-3">
              <Label htmlFor="photo" className="text-sm font-semibold">
                Profile Photo
              </Label>
              <div className="flex flex-col items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/40 shadow-lg">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted border-4 border-primary/40 flex items-center justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="relative">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('photo')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload from Files
                  </Button>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm font-semibold">
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-semibold">
                Gender
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleSave}
                className="w-full max-w-xs h-12 text-base font-semibold"
              >
                Save Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            © 2026. Built with <Heart className="inline h-4 w-4 text-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
