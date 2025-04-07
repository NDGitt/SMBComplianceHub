import { 
  BusinessType, 
  Location,
  RequirementCategory,
  ComplianceRequirement,
  ServiceProvider
} from "@shared/schema";

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

// API functions for fetching data
export async function fetchBusinessTypes(): Promise<BusinessType[]> {
  const response = await fetch('/api/business-types');
  if (!response.ok) {
    throw new Error('Failed to fetch business types');
  }
  return response.json();
}

export async function fetchLocationsByState(stateCode: string): Promise<Location[]> {
  const response = await fetch(`/api/locations/${stateCode}`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
}

export async function fetchRequirementCategories(): Promise<RequirementCategory[]> {
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
  const response = await fetch(
    `/api/requirements-with-providers?businessTypeId=${businessTypeId}&locationId=${locationId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch requirements');
  }
  return response.json();
}

export async function fetchProviders(): Promise<ServiceProvider[]> {
  const response = await fetch('/api/providers');
  if (!response.ok) {
    throw new Error('Failed to fetch providers');
  }
  return response.json();
}

export async function fetchProvidersWithDetails(): Promise<ProviderWithCategory[]> {
  const response = await fetch('/api/providers-with-details');
  if (!response.ok) {
    throw new Error('Failed to fetch providers with details');
  }
  return response.json();
}

export async function fetchProvidersByRequirement(requirementId: number): Promise<ServiceProvider[]> {
  const response = await fetch(`/api/providers/by-requirement/${requirementId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch providers for requirement');
  }
  return response.json();
}
