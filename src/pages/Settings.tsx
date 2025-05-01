import React from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Key, Bell, ShieldCheck, Globe, CreditCard } from "lucide-react";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-6">Settings</h1>
          
          <Tabs defaultValue="account">
            <div className="flex">
              <div className="w-64 mr-8">
                <TabsList className="flex flex-col w-full bg-transparent space-y-1 items-stretch h-auto">
                  <TabsTrigger value="account" className="flex justify-start px-4 py-2 text-left">
                    <User className="h-4 w-4 mr-2" /> Account
                  </TabsTrigger>
                  <TabsTrigger value="password" className="flex justify-start px-4 py-2 text-left">
                    <Key className="h-4 w-4 mr-2" /> Password
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex justify-start px-4 py-2 text-left">
                    <Bell className="h-4 w-4 mr-2" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="flex justify-start px-4 py-2 text-left">
                    <ShieldCheck className="h-4 w-4 mr-2" /> Privacy
                  </TabsTrigger>
                  <TabsTrigger value="api" className="flex justify-start px-4 py-2 text-left">
                    <Globe className="h-4 w-4 mr-2" /> API Access
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="flex justify-start px-4 py-2 text-left">
                    <CreditCard className="h-4 w-4 mr-2" /> Billing
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1">
                <TabsContent value="account" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 text-xl font-bold">
                        JD
                      </div>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">First Name</label>
                          <Input defaultValue="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Last Name</label>
                          <Input defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <Input defaultValue="john.doe@example.com" type="email" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <Input defaultValue="johndoe" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Company</label>
                        <Input defaultValue="Acme Inc" />
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Preferences</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Dark Mode</div>
                              <div className="text-sm text-gray-500">Enable dark mode for the interface</div>
                            </div>
                            <Switch id="dark-mode" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Autosave</div>
                              <div className="text-sm text-gray-500">Automatically save projects</div>
                            </div>
                            <Switch id="autosave" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-4">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={() => toast.success("Account settings saved!")}>Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="password" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Password Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <Input type="password" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <Input type="password" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <Input type="password" />
                    </div>
                    
                    <div className="flex justify-end gap-4">
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={() => toast.success("Password updated successfully!")}>Update Password</Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Other tab contents would go here */}
                <TabsContent value="notifications" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive email updates about your activity</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                        </div>
                        <Switch id="push-notifications" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing">Marketing Emails</Label>
                          <p className="text-sm text-gray-500">Receive emails about new features and offers</p>
                        </div>
                        <Switch id="marketing" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={() => toast.success("Notification settings saved!")}>Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
                  <p>Configure your privacy preferences.</p>
                </TabsContent>
                
                <TabsContent value="api" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">API Access</h2>
                  <p>Manage your API keys and access.</p>
                </TabsContent>
                
                <TabsContent value="billing" className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Billing Information</h2>
                  <p>Manage your subscription and payment methods.</p>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
