import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProvidersWithDetails, fetchRequirementCategories } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import ProviderCard from "@/components/providers/ProviderCard";

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  
  // Fetch all providers with category details
  const {
    data: providers,
    isLoading: isLoadingProviders,
    error: providersError,
  } = useQuery({
    queryKey: ["/api/providers-with-details"],
  });
  
  // Fetch categories for filtering
  const {
    data: categories,
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ["/api/requirement-categories"],
  });
  
  // Set initial state for filters when data is loaded
  useEffect(() => {
    if (categories) {
      setSelectedCategories(categories.map(cat => cat.id));
    }
  }, [categories]);
  
  // Get unique locations for filtering
  const locations = providers 
    ? Array.from(new Set(providers.map(p => p.locationText)))
    : [];
  
  // Filter providers based on search term, categories, rating, and location
  const filteredProviders = providers?.filter(provider => {
    const matchesSearch = searchTerm === "" || 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.categoryName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.includes(provider.categoryId);
    
    const matchesRating = selectedRating === "" || 
      (selectedRating === "4+" && provider.rating >= 4) ||
      (selectedRating === "3+" && provider.rating >= 3);
    
    const matchesLocation = selectedLocation === "" || 
      provider.locationText === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesRating && matchesLocation;
  });
  
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(cat => cat !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories(categories?.map(cat => cat.id) || []);
    setSelectedRating("");
    setSelectedLocation("");
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Service Provider Marketplace
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Browse our directory of trusted service providers who can help your business stay compliant with all requirements.
        </p>
        
        <div className="flex flex-col lg:flex-row">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-4">Find Providers</h3>
              
              <div className="mb-4">
                <Label htmlFor="search-providers" className="block text-gray-700 mb-2">
                  Search
                </Label>
                <Input
                  id="search-providers"
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Service Category</h4>
                <div className="space-y-2">
                  {isLoadingCategories ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading categories...</span>
                    </div>
                  ) : (
                    categories?.map(category => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                          className="h-4 w-4"
                        />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-gray-700"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="rating-4"
                      checked={selectedRating === "4+"}
                      onCheckedChange={() => setSelectedRating(selectedRating === "4+" ? "" : "4+")}
                      className="h-4 w-4"
                    />
                    <Label
                      htmlFor="rating-4"
                      className="ml-2 text-gray-700"
                    >
                      4★ & above
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="rating-3"
                      checked={selectedRating === "3+"}
                      onCheckedChange={() => setSelectedRating(selectedRating === "3+" ? "" : "3+")}
                      className="h-4 w-4"
                    />
                    <Label
                      htmlFor="rating-3"
                      className="ml-2 text-gray-700"
                    >
                      3★ & above
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Location</h4>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Location</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Providers List */}
          <div className="lg:w-3/4">
            {isLoadingProviders ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
                <span className="text-xl">Loading service providers...</span>
              </div>
            ) : providersError ? (
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <p className="text-red-600">Failed to load service providers. Please try again later.</p>
              </div>
            ) : filteredProviders?.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-gray-500">No providers match your filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProviders?.map(provider => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}
            
            {filteredProviders && filteredProviders.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <a href="#" className="px-3 py-1 rounded-md text-gray-500 hover:text-primary">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="px-3 py-1 rounded-md bg-primary text-white">1</a>
                  <a href="#" className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100">2</a>
                  <a href="#" className="px-3 py-1 rounded-md text-gray-500 hover:text-primary">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Providers;
