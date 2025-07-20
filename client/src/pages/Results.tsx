import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchRequirementsWithProviders, fetchBusinessTypes, fetchLocationsByState } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import RequirementCard from "@/components/requirements/RequirementCard";
import { RequirementsByCategory } from "@/lib/data";

// Get base path for GitHub Pages (should match App.tsx)
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
      return '/SMBComplianceHub';
    }
  }
  return '';
};

// Navigation function that handles base path
const navigateWithBasePath = (path: string) => {
  const basePath = getBasePath();
  const fullPath = basePath + path;
  window.history.pushState({}, '', fullPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const Results = () => {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const businessTypeId = params.get("businessTypeId");
  const locationId = params.get("locationId");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedUrgencies, setSelectedUrgencies] = useState<string[]>([]);
  const [displayedBusinessType, setDisplayedBusinessType] = useState("");
  const [displayedLocation, setDisplayedLocation] = useState("");

  // Fetch requirements with providers
  const {
    data: requirementsByCategory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requirements-with-providers", businessTypeId, locationId],
    queryFn: () => fetchRequirementsWithProviders(
      parseInt(businessTypeId || "0"), 
      parseInt(locationId || "0")
    ),
    enabled: !!businessTypeId && !!locationId,
  });

  // Fetch business types for display
  const { data: businessTypes } = useQuery({
    queryKey: ["business-types"],
    queryFn: fetchBusinessTypes,
  });

  // Fetch locations for display  
  const { data: locations } = useQuery({
    queryKey: ["locations", "ca"],
    queryFn: () => fetchLocationsByState("ca"),
  });

  // Get all unique categories and urgencies for filtering
  const allCategories = requirementsByCategory?.map(
    (group) => group.category.name
  ) || [];
  const allUrgencies = Array.from(
    new Set(
      requirementsByCategory
        ?.flatMap((group) => group.requirements)
        .map((req) => req.urgency) || []
    )
  );

  // Set initial state for filters when data is loaded
  useEffect(() => {
    if (requirementsByCategory) {
      setSelectedCategories(allCategories);
      setSelectedUrgencies(allUrgencies);
      
      // Set business type and location details using fetched data
      const businessType = businessTypes?.find(
        (bt: any) => bt.id.toString() === businessTypeId
      );
      
      const location = locations?.find(
        (loc: any) => loc.id.toString() === locationId
      );
      
      if (businessType) {
        setDisplayedBusinessType(businessType.name);
      }
      
      if (location) {
        setDisplayedLocation(`${location.city}, ${location.state}`);
      } else {
        setDisplayedLocation("Berkeley, California");
      }
    }
  }, [requirementsByCategory, businessTypes, locations, businessTypeId, locationId]);

  // Filter requirements based on search term, selected categories, and urgencies
  const filteredRequirements = requirementsByCategory
    ?.filter((group) => selectedCategories.includes(group.category.name))
    .map((group) => ({
      ...group,
      requirements: group.requirements.filter(
        (req) =>
          selectedUrgencies.includes(req.urgency) &&
          (searchTerm === "" ||
            req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    }))
    .filter((group) => group.requirements.length > 0);

  // Count total requirements
  const totalRequirements = filteredRequirements?.reduce(
    (acc, group) => acc + group.requirements.length,
    0
  ) || 0;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const toggleUrgency = (urgency: string) => {
    setSelectedUrgencies((prev) =>
      prev.includes(urgency)
        ? prev.filter((urg) => urg !== urgency)
        : [...prev, urgency]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories(allCategories);
    setSelectedUrgencies(allUrgencies);
  };

  if (!businessTypeId || !locationId) {
    return (
      <div className="py-12 bg-gray-50 flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-lg">
          <div className="flex items-center text-red-600 mb-4">
            <AlertCircle className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold">Missing Parameters</h2>
          </div>
          <p className="mb-4">
            Please complete the discovery process to see your compliance requirements.
          </p>
          <Button onClick={() => navigateWithBasePath("/discovery")}>
            Go to Discovery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
            <span className="text-xl">Loading your compliance requirements...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">
                  Failed to load compliance requirements. Please try again later.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 border-l-4 border-primary p-4 mb-8 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800" id="results-summary">
                    We found{" "}
                    <span id="requirements-count" className="font-bold">
                      {totalRequirements}
                    </span>{" "}
                    compliance requirements for{" "}
                    <span id="business-type-display" className="font-bold">
                      {displayedBusinessType}
                    </span>{" "}
                    in{" "}
                    <span id="location-display" className="font-bold">
                      {displayedLocation}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Filter Requirements</h3>

                  <div className="mb-4">
                    <Label htmlFor="search-requirements" className="block text-gray-700 mb-2">
                      Search
                    </Label>
                    <Input
                      id="search-requirements"
                      placeholder="Search requirements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Category</h4>
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                            className="h-4 w-4"
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="ml-2 text-gray-700"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Urgency</h4>
                    <div className="space-y-2">
                      {allUrgencies.map((urgency) => (
                        <div key={urgency} className="flex items-center">
                          <Checkbox
                            id={`urgency-${urgency}`}
                            checked={selectedUrgencies.includes(urgency)}
                            onCheckedChange={() => toggleUrgency(urgency)}
                            className="h-4 w-4"
                          />
                          <Label
                            htmlFor={`urgency-${urgency}`}
                            className="ml-2 text-gray-700"
                          >
                            {urgency}
                          </Label>
                        </div>
                      ))}
                    </div>
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

              {/* Requirements and Providers List */}
              <div className="lg:w-3/4">
                {filteredRequirements?.length === 0 ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <p className="text-gray-500">No requirements match your filters.</p>
                  </div>
                ) : (
                  filteredRequirements?.map((group) => (
                    <div key={group.category.id} className="mb-8">
                      <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                        {group.category.name} Requirements
                      </h3>

                      {group.requirements.map((requirement) => (
                        <RequirementCard
                          key={requirement.id}
                          requirement={requirement}
                        />
                      ))}
                    </div>
                  ))
                )}

                <div className="mt-8 text-center">
                                  <Button 
                  className="inline-flex items-center"
                  onClick={() => navigateWithBasePath("/providers")}
                >
                  <span>Browse All Service Providers</span>
                  <svg
                    className="h-4 w-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Results;
