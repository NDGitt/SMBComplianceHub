import { 
  BusinessType, 
  Location,
  RequirementCategory,
  ComplianceRequirement,
  ServiceProvider
} from "@shared/schema";
import { 
  mockBusinessTypes, 
  mockLocations, 
  mockRequirementCategories, 
  mockRequirementsWithProviders, 
  mockServiceProviders, 
  mockProvidersWithDetails 
} from "./mockData";

// Type for requirements grouped by category
export interface RequirementsByCategory {
  category: RequirementCategory;
  requirements: (ComplianceRequirement & { 
    providers?: ServiceProvider[] 
  })[];
}

// Type for provider with category name
export interface ProviderWithCategory extends ServiceProvider {
  categoryName: string;
}

// Helper function to check if we're in a static environment (GitHub Pages)
const isStaticEnvironment = () => {
  return typeof window !== 'undefined' && window.location.hostname.includes('github.io');
};

// API functions for fetching data
export async function fetchBusinessTypes(): Promise<BusinessType[]> {
  if (isStaticEnvironment()) {
    return mockBusinessTypes;
  }
  
  const response = await fetch('/api/business-types');
  if (!response.ok) {
    throw new Error('Failed to fetch business types');
  }
  return response.json();
}

export async function fetchLocationsByState(stateCode: string): Promise<Location[]> {
  if (isStaticEnvironment()) {
    return mockLocations;
  }
  
  const response = await fetch(`/api/locations/${stateCode}`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
}

export async function fetchRequirementCategories(): Promise<RequirementCategory[]> {
  if (isStaticEnvironment()) {
    return mockRequirementCategories;
  }
  
  const response = await fetch('/api/requirement-categories');
  if (!response.ok) {
    throw new Error('Failed to fetch requirement categories');
  }
  return response.json();
}

export async function fetchRequirementsWithProviders(
  businessTypeId: number, 
  locationId: number
): Promise<RequirementsByCategory[]> {
  if (isStaticEnvironment()) {
    return mockRequirementsWithProviders;
  }
  
  const response = await fetch(
    `/api/requirements-with-providers?businessTypeId=${businessTypeId}&locationId=${locationId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch requirements');
  }
  return response.json();
}

export async function fetchProviders(): Promise<ServiceProvider[]> {
  if (isStaticEnvironment()) {
    return mockServiceProviders;
  }
  
  const response = await fetch('/api/providers');
  if (!response.ok) {
    throw new Error('Failed to fetch providers');
  }
  return response.json();
}

export async function fetchProvidersWithDetails(): Promise<ProviderWithCategory[]> {
  if (isStaticEnvironment()) {
    return mockProvidersWithDetails;
  }
  
  const response = await fetch('/api/providers-with-details');
  if (!response.ok) {
    throw new Error('Failed to fetch providers with details');
  }
  return response.json();
}

export async function fetchProvidersByRequirement(requirementId: number): Promise<ServiceProvider[]> {
  if (isStaticEnvironment()) {
    // Return providers that match the requirement category
    const requirement = mockRequirementsWithProviders
      .flatMap(cat => cat.requirements)
      .find(req => req.id === requirementId);
    
    if (requirement?.providers) {
      return requirement.providers;
    }
    
    return mockServiceProviders.slice(0, 2); // Return first 2 providers as fallback
  }
  
  const response = await fetch(`/api/providers/by-requirement/${requirementId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch providers for requirement');
  }
  return response.json();
}
