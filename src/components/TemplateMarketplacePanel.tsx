
import React from "react";
import { Store, Tag, Star, ShoppingCart, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  isPremium: boolean;
  rating: number;
  thumbnail: string;
}

const TemplateMarketplacePanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const templates: Template[] = [
    {
      id: "1",
      name: "Social Story",
      description: "15s, fast-paced, vertical layout for social media stories",
      category: "social",
      price: "Free",
      isPremium: false,
      rating: 4.5,
      thumbnail: "https://via.placeholder.com/300x200?text=Social+Story"
    },
    {
      id: "2",
      name: "YouTube Intro",
      description: "10s, animated title sequence with modern effects",
      category: "youtube",
      price: "Free",
      isPremium: false,
      rating: 4.2,
      thumbnail: "https://via.placeholder.com/300x200?text=YouTube+Intro"
    },
    {
      id: "3",
      name: "Promo Reel",
      description: "30s, promotional video template with professional transitions",
      category: "marketing",
      price: "$12.99",
      isPremium: true,
      rating: 4.8,
      thumbnail: "https://via.placeholder.com/300x200?text=Promo+Reel"
    },
    {
      id: "4",
      name: "Product Showcase",
      description: "20s, clean product highlight template with text animations",
      category: "marketing",
      price: "$9.99",
      isPremium: true,
      rating: 4.6,
      thumbnail: "https://via.placeholder.com/300x200?text=Product+Showcase"
    },
    {
      id: "5",
      name: "TikTok Dance",
      description: "15s, trending music template with dance markers",
      category: "social",
      price: "Free",
      isPremium: false,
      rating: 4.1,
      thumbnail: "https://via.placeholder.com/300x200?text=TikTok+Dance"
    }
  ];

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "social", name: "Social Media" },
    { id: "youtube", name: "YouTube" },
    { id: "marketing", name: "Marketing" },
    { id: "business", name: "Business" },
    { id: "personal", name: "Personal" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: Template) => {
    if (template.isPremium) {
      toast.info(`${template.name} is a premium template that costs ${template.price}. Upgrade to access all premium templates!`);
    } else {
      toast.success(`Template "${template.name}" selected!`);
    }
  };
  
  const handleCreateTemplate = () => {
    toast.info("Create and sell your own template feature coming soon!");
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <Store className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-blue-900">Template Marketplace</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleCreateTemplate}
          >
            Create & Sell Templates
          </Button>
          <Button variant="outline" className="border-blue-300">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Cart (0)
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="w-2/3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <Button 
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"} 
            size="sm"
            className={selectedCategory === category.id ? "bg-blue-600" : ""}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className={`rounded-xl overflow-hidden border ${template.isPremium ? 'border-yellow-400' : 'border-blue-200'} hover:shadow-lg transition-shadow cursor-pointer`}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="h-40 bg-gray-100 relative">
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="w-full h-full object-cover"
              />
              {template.isPremium && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                  PREMIUM
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-blue-900">{template.name}</h3>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span>{template.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 text-blue-600 mr-1" />
                  <span className={`font-medium ${template.isPremium ? 'text-amber-600' : 'text-green-600'}`}>
                    {template.price}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className={template.isPremium ? 
                    "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600" : 
                    "bg-blue-600 hover:bg-blue-700"}
                >
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Sell Your Templates</h3>
        <p className="text-sm text-blue-800 mb-3">
          Create and sell your own video templates or list design packs on our marketplace.
          <span className="ml-1 font-semibold text-blue-600">Earn commission on sales!</span>
        </p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600">
          Apply for Creator Account
        </Button>
      </div>
    </div>
  );
};

export default TemplateMarketplacePanel;
