import type { BusinessType, Location, RequirementCategory, ServiceProvider } from "@shared/schema";
import type { RequirementsByCategory, ProviderWithCategory } from "./data";

// Mock business types data
export const mockBusinessTypes: BusinessType[] = [
  { id: 1, name: "Restaurant", description: "Food service establishments" },
  { id: 2, name: "Retail Store", description: "General merchandise retail" },
  { id: 3, name: "Manufacturing", description: "Industrial manufacturing" },
  { id: 4, name: "Healthcare", description: "Medical and healthcare services" },
  { id: 5, name: "Construction", description: "Building and construction services" },
];

// Mock locations data
export const mockLocations: Location[] = [
  { id: 1, city: "Berkeley", state: "CA", stateCode: "CA" },
  { id: 2, city: "Oakland", state: "CA", stateCode: "CA" },
  { id: 3, city: "San Francisco", state: "CA", stateCode: "CA" },
  { id: 4, city: "San Jose", state: "CA", stateCode: "CA" },
  { id: 5, city: "Sacramento", state: "CA", stateCode: "CA" },
];

// Mock requirement categories
export const mockRequirementCategories: RequirementCategory[] = [
  { id: 1, name: "Health & Safety", description: "Health and safety compliance requirements" },
  { id: 2, name: "Fire Safety", description: "Fire safety and prevention requirements" },
  { id: 3, name: "Licensing", description: "Business licensing and permits" },
  { id: 4, name: "Employment", description: "Employment and labor law compliance" },
  { id: 5, name: "Environmental", description: "Environmental protection requirements" },
];

// Mock service providers
export const mockServiceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "SafetyFirst Compliance",
    description: "Comprehensive health and safety compliance services",
    locationText: "Berkeley, CA",
    rating: 4.8,
    reviewCount: 127,
    price: "$500-2000",
    certification: "ISO 45001",
    categoryId: 1,
  },
  {
    id: 2,
    name: "FireGuard Solutions",
    description: "Specialized fire safety and prevention services",
    locationText: "Oakland, CA",
    rating: 4.6,
    reviewCount: 89,
    price: "$300-1500",
    certification: "NFPA Certified",
    categoryId: 2,
  },
  {
    id: 3,
    name: "LicensePro Services",
    description: "Business licensing and permit assistance",
    locationText: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 203,
    price: "$200-800",
    certification: "BBB Accredited",
    categoryId: 3,
  },
  {
    id: 4,
    name: "HR Compliance Partners",
    description: "Employment law and HR compliance services",
    locationText: "San Jose, CA",
    rating: 4.7,
    reviewCount: 156,
    price: "$400-2500",
    certification: "SHRM Certified",
    categoryId: 4,
  },
  {
    id: 5,
    name: "EcoCompliance Group",
    description: "Environmental compliance and sustainability services",
    locationText: "Sacramento, CA",
    rating: 4.5,
    reviewCount: 94,
    price: "$600-3000",
    certification: "EPA Certified",
    categoryId: 5,
  },
];

// Mock requirements with providers data
export const mockRequirementsWithProviders: RequirementsByCategory[] = [
  {
    category: { id: 1, name: "Health & Safety", description: "Health and safety compliance requirements" },
    requirements: [
      {
        id: 1,
        name: "Food Safety Certification",
        description: "Required food safety training and certification for restaurant staff",
        urgency: "High",
        deadline: "30 days",
        estimatedCost: "$200-500",
        providers: [mockServiceProviders[0]],
      },
      {
        id: 2,
        name: "Health Inspection",
        description: "Regular health department inspections and compliance",
        urgency: "Medium",
        deadline: "90 days",
        estimatedCost: "$100-300",
        providers: [mockServiceProviders[0]],
      },
    ],
  },
  {
    category: { id: 2, name: "Fire Safety", description: "Fire safety and prevention requirements" },
    requirements: [
      {
        id: 3,
        name: "Fire Safety Inspection",
        description: "Annual fire safety inspection and certification",
        urgency: "High",
        deadline: "60 days",
        estimatedCost: "$300-800",
        providers: [mockServiceProviders[1]],
      },
    ],
  },
  {
    category: { id: 3, name: "Licensing", description: "Business licensing and permits" },
    requirements: [
      {
        id: 4,
        name: "Business License",
        description: "City business license application and renewal",
        urgency: "High",
        deadline: "Immediate",
        estimatedCost: "$50-200",
        providers: [mockServiceProviders[2]],
      },
      {
        id: 5,
        name: "Food Service Permit",
        description: "Food service establishment permit",
        urgency: "High",
        deadline: "30 days",
        estimatedCost: "$150-400",
        providers: [mockServiceProviders[2]],
      },
    ],
  },
];

// Mock providers with category details
export const mockProvidersWithDetails: ProviderWithCategory[] = mockServiceProviders.map(provider => ({
  ...provider,
  categoryName: mockRequirementCategories.find(cat => cat.id === provider.categoryId)?.name || "General",
})); 