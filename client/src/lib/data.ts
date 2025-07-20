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

// Debug function to test mock data (available in console)
if (typeof window !== 'undefined') {
  (window as any).debugMockData = () => {
    console.log('🧪 Mock Data Debug:', {
      businessTypes: mockBusinessTypes,
      locations: mockLocations,
      categories: mockRequirementCategories,
      providers: mockProvidersWithDetails,
      isStatic: isStaticEnvironment(),
      hostname: window.location.hostname
    });
  };
  
  // Also expose the environment check function
  (window as any).checkEnvironment = () => {
    console.log('🌍 Environment Check:', {
      hostname: window.location.hostname,
      isStatic: isStaticEnvironment(),
      userAgent: navigator.userAgent
    });
  };
}

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
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isGitHubPages = hostname.includes('github.io');
  
  console.log('🔍 Environment detection:', { hostname, isLocalhost, isGitHubPages });
  
  // Use mock data for GitHub Pages or any non-localhost environment
  return isGitHubPages || !isLocalhost;
};

// API functions for fetching data
export async function fetchBusinessTypes(): Promise<BusinessType[]> {
  const isStatic = isStaticEnvironment();
  console.log('🔍 fetchBusinessTypes - Environment check:', { 
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
    isStatic,
    mockDataLength: mockBusinessTypes.length
  });
  
  // Force mock data for non-localhost environments
  if (isStatic) {
    console.log('✅ Using mock data for business types:', mockBusinessTypes);
    return new Promise(resolve => {
      setTimeout(() => resolve(mockBusinessTypes), 100); // Small delay to simulate API
    });
  }
  
  console.log('🌐 Trying to fetch from API...');
  try {
    const response = await fetch('/api/business-types');
    if (!response.ok) {
      throw new Error('Failed to fetch business types');
    }
    return response.json();
  } catch (error) {
    console.error('❌ API failed, falling back to mock data:', error);
    return mockBusinessTypes;
  }
}

export async function fetchLocationsByState(stateCode: string): Promise<Location[]> {
  if (isStaticEnvironment()) {
    console.log('Using mock data for locations');
    return Promise.resolve(mockLocations);
  }
  
  try {
    const response = await fetch(`/api/locations/${stateCode}`);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    return response.json();
  } catch (error) {
    console.error('API failed, falling back to mock locations:', error);
    return mockLocations;
  }
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
  const isStatic = isStaticEnvironment();
  console.log('🔍 fetchProvidersWithDetails - Environment check:', { 
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
    isStatic,
    mockProvidersLength: mockProvidersWithDetails.length
  });
  
  // Force mock data for non-localhost environments
  if (isStatic) {
    console.log('✅ Using mock data for providers with details:', mockProvidersWithDetails);
    return new Promise(resolve => {
      setTimeout(() => resolve(mockProvidersWithDetails), 150); // Small delay to simulate API
    });
  }
  
  console.log('🌐 Trying to fetch providers from API...');
  try {
    const response = await fetch('/api/providers-with-details');
    if (!response.ok) {
      throw new Error('Failed to fetch providers with details');
    }
    return response.json();
  } catch (error) {
    console.error('❌ Providers API failed, falling back to mock data:', error);
    return mockProvidersWithDetails;
  }
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
