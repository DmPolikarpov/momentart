import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Settings, Heart, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/useToast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

const UserProfile = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth';
        return;
      }

      setUser(user);
      
      // Get or create profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!profile) {
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || ''
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        setProfile(profile);
      }

      setFormData({
        full_name: profile?.full_name || user.user_metadata?.full_name || '',
        email: profile?.email || user.email || ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          email: formData.email
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      setEditing(false);
      getUser(); // Refresh profile data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header />
        <div className="pt-24 pb-16 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {profile?.full_name || 'User Profile'}
                  </h1>
                  <p className="text-green-100 mt-2">
                    {profile?.email}
                  </p>
                  <p className="text-green-100 text-sm mt-1">
                    Member since {new Date(profile?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Information */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                    <Button
                      onClick={() => setEditing(!editing)}
                      variant="outline"
                      size="sm"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {editing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                  {editing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                        />
                      </div>
                      <Button onClick={updateProfile} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{profile?.full_name || 'Not set'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{profile?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">
                            {new Date(profile?.created_at || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Activity Stats */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <Heart className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Favorite Articles</p>
                        <p className="font-medium text-green-600">0</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500">Articles Read</p>
                        <p className="font-medium text-emerald-600">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;