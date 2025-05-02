
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Search, 
  Filter, 
  Clock, 
  Star, 
  Download, 
  Heart, 
  MessageSquare 
} from "lucide-react";

interface TemplateProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  rating: number;
  reviews: number;
  price: number | 'Free';
  downloads: number;
  category: string;
  featured?: boolean;
}

const TemplateMarketplacePanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  
  // Mock template data
  const templates: TemplateProps[] = [
    {
      id: "1",
      title: "Product Launch Promo",
      description: "Perfect for showcasing new product launches with dynamic animations and call to actions.",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      author: "Marketing Templates",
      rating: 4.8,
      reviews: 124,
      price: 'Free',
      downloads: 1245,
      category: "marketing",
      featured: true
    },
    {
      id: "2",
      title: "Corporate Explainer",
      description: "Professional template for business presentations and company overviews.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      author: "Business Media",
      rating: 4.5,
      reviews: 98,
      price: 29.99,
      downloads: 875,
      category: "business"
    },
    {
      id: "3",
      title: "Social Media Story",
      description: "Vertical format optimized for Instagram, TikTok and other social platforms.",
      imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
      author: "Social Media Pros",
      rating: 4.7,
      reviews: 203,
      price: 19.99,
      downloads: 2103,
      category: "social"
    },
    {
      id: "4",
      title: "Educational Course Intro",
      description: "Designed for online courses and educational content with sections for learning goals.",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
      author: "EduMedia",
      rating: 4.9,
      reviews: 156,
      price: 'Free',
      downloads: 1876,
      category: "educational"
    },
    {
      id: "5",
      title: "Real Estate Tour",
      description: "Showcase properties with this elegant template designed for real estate agents.",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      author: "Property Media",
      rating: 4.6,
      reviews: 87,
      price: 39.99,
      downloads: 652,
      category: "business"
    },
    {
      id: "6",
      title: "YouTube Intro",
      description: "Attention-grabbing intro for YouTube videos with customizable colors and text.",
      imageUrl: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
      author: "Content Creators Hub",
      rating: 4.8,
      reviews: 211,
      price: 24.99,
      downloads: 1942,
      category: "social",
      featured: true
    }
  ];
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Categories for filter
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "marketing", label: "Marketing" },
    { value: "business", label: "Business" },
    { value: "social", label: "Social Media" },
    { value: "educational", label: "Educational" }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      toast.error("All fields are required");
      return;
    }
    
    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Simulate account creation
    toast.success("Account created successfully! Welcome to the Marketplace.");
    setShowCreateAccount(false);
    
    // In a real app, you would call an API to create the account
  };
  
  const handleUseTemplate = (template: TemplateProps) => {
    // Check if the template is premium
    if (template.price !== 'Free') {
      setShowCreateAccount(true);
      return;
    }
    
    // Add the template to the project
    toast.success(`${template.title} template applied to your project!`);
  };
  
  return (
    <div className="px-4 py-6">
      {!showCreateAccount ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Template Marketplace</h2>
            <p className="text-gray-600">Browse and use professional video templates</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search templates..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex-shrink-0 flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <select 
                className="border border-gray-300 rounded-md px-3 py-2 text-sm" 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <Card key={template.id} className={template.featured ? "border-purple-300 shadow-md" : ""}>
                <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <img 
                    src={template.imageUrl} 
                    alt={template.title} 
                    className="w-full h-full object-cover"
                  />
                  {template.featured && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold">{template.title}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>{template.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> {template.reviews}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" /> {template.downloads}
                    </span>
                  </div>
                  <CardDescription className="mt-2 text-sm text-gray-600">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between items-center">
                  <div>
                    {typeof template.price === 'number' ? (
                      <span className="font-bold text-green-700">${template.price}</span>
                    ) : (
                      <span className="font-bold text-green-700">Free</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to favorites</span>
                    </Button>
                    <Button 
                      onClick={() => handleUseTemplate(template)}
                      className={typeof template.price === 'number' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {typeof template.price === 'number' ? 'Buy & Use' : 'Use Template'}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        // Account creation form
        <div className="max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create an Account</h2>
            <p className="text-gray-600">Sign up to access premium templates</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Join the Marketplace</CardTitle>
              <CardDescription>
                Get access to thousands of professional video templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAccount}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Input 
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="passwordConfirm" className="text-sm font-medium">Confirm Password</label>
                    <Input 
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      value={formData.passwordConfirm}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowCreateAccount(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAccount}>
                Create Account
              </Button>
            </CardFooter>
          </Card>
          
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account? <button onClick={() => toast.info("Login functionality coming soon!")} className="text-blue-600 hover:underline">Log in</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default TemplateMarketplacePanel;
