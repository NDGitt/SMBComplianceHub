import type { BusinessType, Location, RequirementCategory, ServiceProvider } from "@shared/schema";
import type { RequirementsByCategory, ProviderWithCategory } from "./data";

// Mock business types data
export const mockBusinessTypes: BusinessType[] = [
  { id: 1, name: "Restaurant", slug: "restaurant" },
  { id: 2, name: "Retail Store", slug: "retail-store" },
  { id: 3, name: "Manufacturing", slug: "manufacturing" },
  { id: 4, name: "Healthcare", slug: "healthcare" },
  { id: 5, name: "Construction", slug: "construction" },
];

// Mock locations data
export const mockLocations: Location[] = [
  { id: 1, city: "Berkeley", state: "California", stateCode: "CA", citySlug: "berkeley" },
  // { id: 2, city: "Oakland", state: "California", stateCode: "CA", citySlug: "oakland" },
  // { id: 3, city: "San Francisco", state: "California", stateCode: "CA", citySlug: "san-francisco" },
  // { id: 4, city: "San Jose", state: "California", stateCode: "CA", citySlug: "san-jose" },
  // { id: 5, city: "Sacramento", state: "California", stateCode: "CA", citySlug: "sacramento" },
];

// Mock requirement categories
export const mockRequirementCategories: RequirementCategory[] = [
  { id: 1, name: "Health & Safety", slug: "health-safety" },
  { id: 2, name: "Fire Safety", slug: "fire-safety" },
  { id: 3, name: "Licensing", slug: "licensing" },
  { id: 4, name: "Employment", slug: "employment" },
  { id: 5, name: "Environmental", slug: "environmental" },
];

// Mock service providers
export const mockServiceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "SafetyFirst Compliance",
    description: "Comprehensive health and safety compliance services",
    locationText: "Berkeley, CA",
    rating: 5,
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
    rating: 5,
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
    rating: 5,
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
    rating: 5,
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
    rating: 4,
    reviewCount: 94,
    price: "$600-3000",
    certification: "EPA Certified",
    categoryId: 5,
  },
];

// Mock requirements with providers data
export const mockRequirementsWithProviders: RequirementsByCategory[] = [
  {
    category: { id: 1, name: "Health & Safety", slug: "health-safety" },
    requirements: [
      {
        id: 1,
        title: "Food Safety Certification",
        description: "Required food safety training and certification for restaurant staff",
        urgency: "High",
        timeframe: "30 days",
        categoryId: 1,
        businessTypeId: 1,
        locationId: 1,
        providers: [mockServiceProviders[0]],
      },
      {
        id: 2,
        title: "Health Inspection",
        description: "Regular health department inspections and compliance",
        urgency: "Medium",
        timeframe: "90 days",
        categoryId: 1,
        businessTypeId: 1,
        locationId: 1,
        providers: [mockServiceProviders[0]],
      },
    ],
  },
  {
    category: { id: 2, name: "Fire Safety", slug: "fire-safety" },
    requirements: [
      {
        id: 3,
        title: "Fire Safety Inspection",
        description: "Annual fire safety inspection and certification",
        urgency: "High",
        timeframe: "60 days",
        categoryId: 2,
        businessTypeId: 1,
        locationId: 1,
        providers: [mockServiceProviders[1]],
      },
    ],
  },
  {
    category: { id: 3, name: "Licensing", slug: "licensing" },
    requirements: [
      {
        id: 4,
        title: "Business License",
        description: "City business license application and renewal",
        urgency: "High",
        timeframe: "Immediate",
        categoryId: 3,
        businessTypeId: 1,
        locationId: 1,
        providers: [mockServiceProviders[2]],
      },
      {
        id: 5,
        title: "Food Service Permit",
        description: "Food service establishment permit",
        urgency: "High",
        timeframe: "30 days",
        categoryId: 3,
        businessTypeId: 1,
        locationId: 1,
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