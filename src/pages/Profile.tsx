
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import { useUser } from '@/contexts/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { User, Settings, Lock } from 'lucide-react';

interface ProfileFormData {
  name: string;
  email: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const { user, login, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    // In a real app, this would connect to a backend
    if (user) {
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email
      };
      
      login(updatedUser);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    }
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    // In a real app, this would verify the current password and update with the new one
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    // Mock password update
    toast.success('Password updated successfully');
    passwordForm.reset();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please log in to view your profile</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            My Profile
          </h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={18} />
                <span>Profile Information</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={18} />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Information Tab */}
            <TabsContent value="profile">
              <Card className="glass border-indigo-300/20 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Profile Information</CardTitle>
                  <CardDescription className="text-indigo-200">
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!isEditing} 
                                className={!isEditing ? "bg-white/10 text-white" : "bg-white/20 text-white"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email" 
                                disabled={!isEditing}
                                className={!isEditing ? "bg-white/10 text-white" : "bg-white/20 text-white"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {isEditing ? (
                        <div className="flex space-x-3 pt-2">
                          <Button type="submit" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                            Save Changes
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                            className="border-indigo-400/30 text-indigo-100 hover:bg-indigo-600/20 hover:text-white"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          type="button" 
                          onClick={() => setIsEditing(true)}
                          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="glass border-indigo-300/20 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Password Update</CardTitle>
                  <CardDescription className="text-indigo-200">
                    Change your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Current Password</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" className="bg-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">New Password</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" className="bg-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Confirm New Password</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" className="bg-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                      >
                        Update Password
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-start border-t border-white/10 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Account Actions</h4>
                  <Button 
                    variant="destructive" 
                    onClick={logout}
                    className="mt-2"
                  >
                    Log Out
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
