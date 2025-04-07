import { 
  BusinessType, InsertBusinessType, 
  Location, InsertLocation, 
  RequirementCategory, InsertRequirementCategory,
  ComplianceRequirement, InsertComplianceRequirement,
  ServiceProvider, InsertServiceProvider,
  ProviderRequirement, InsertProviderRequirement
} from "@shared/schema";

// Define the storage interface for our application
export interface IStorage {
  // Business Types
  getBusinessTypes(): Promise<BusinessType[]>;
  getBusinessTypeBySlug(slug: string): Promise<BusinessType | undefined>;
  
  // Locations
  getLocationsByState(stateCode: string): Promise<Location[]>;
  getLocation(stateCode: string, citySlug: string): Promise<Location | undefined>;
  
  // Requirement Categories
  getRequirementCategories(): Promise<RequirementCategory[]>;
  
  // Compliance Requirements
  getRequirementsByBusinessAndLocation(businessTypeId: number, locationId: number): Promise<ComplianceRequirement[]>;
  getRequirementsByCategory(categoryId: number): Promise<ComplianceRequirement[]>;
  
  // Service Providers
  getProviders(): Promise<ServiceProvider[]>;
  getProvidersByRequirement(requirementId: number): Promise<ServiceProvider[]>;
  getProvidersByCategory(categoryId: number): Promise<ServiceProvider[]>;
}

// Mock implementation of the storage interface
export class MemStorage implements IStorage {
  private businessTypes: Map<number, BusinessType>;
  private locations: Map<number, Location>;
  private requirementCategories: Map<number, RequirementCategory>;
  private complianceRequirements: Map<number, ComplianceRequirement>;
  private serviceProviders: Map<number, ServiceProvider>;
  private providerRequirements: Map<number, ProviderRequirement>;
  
  private businessTypeIdCounter: number = 1;
  private locationIdCounter: number = 1;
  private categoryIdCounter: number = 1;
  private requirementIdCounter: number = 1;
  private providerIdCounter: number = 1;
  private providerRequirementIdCounter: number = 1;
  
  constructor() {
    this.businessTypes = new Map();
    this.locations = new Map();
    this.requirementCategories = new Map();
    this.complianceRequirements = new Map();
    this.serviceProviders = new Map();
    this.providerRequirements = new Map();
    
    // Initialize with mock data
    this.initializeData();
  }
  
  // Initialize mock data
  private async initializeData() {
    // Business Types
    const businessTypes: InsertBusinessType[] = [
      { name: "Restaurant", slug: "restaurant" },
      { name: "Retail Store", slug: "retail" },
      { name: "Construction", slug: "construction" },
      { name: "Salon/Spa", slug: "salon" },
      { name: "Healthcare Practice", slug: "healthcare" },
      { name: "Childcare Facility", slug: "childcare" },
      { name: "Fitness Center", slug: "fitness" },
      { name: "Professional Services", slug: "professional" }
    ];
    
    for (const bt of businessTypes) {
      const id = this.businessTypeIdCounter++;
      this.businessTypes.set(id, { ...bt, id });
    }
    
    // Locations
    const locations: InsertLocation[] = [
      { state: "Rhode Island", stateCode: "ri", city: "Providence", citySlug: "providence" },
      { state: "Rhode Island", stateCode: "ri", city: "Warwick", citySlug: "warwick" },
      { state: "Rhode Island", stateCode: "ri", city: "Cranston", citySlug: "cranston" },
      { state: "California", stateCode: "ca", city: "Berkeley", citySlug: "berkeley" },
      { state: "California", stateCode: "ca", city: "Oakland", citySlug: "oakland" }
    ];
    
    for (const loc of locations) {
      const id = this.locationIdCounter++;
      this.locations.set(id, { ...loc, id });
    }
    
    // Requirement Categories
    const categories: InsertRequirementCategory[] = [
      { name: "Health & Safety", slug: "health-safety" },
      { name: "Licensing", slug: "licensing" },
      { name: "Employment", slug: "employment" },
      { name: "Fire Safety", slug: "fire-safety" },
      { name: "Environmental", slug: "environmental" }
    ];
    
    for (const cat of categories) {
      const id = this.categoryIdCounter++;
      this.requirementCategories.set(id, { ...cat, id });
    }
    
    // Get reference IDs
    const restaurantId = Array.from(this.businessTypes.values()).find(bt => bt.slug === "restaurant")?.id as number;
    const providenceId = Array.from(this.locations.values()).find(l => l.citySlug === "providence" && l.stateCode === "ri")?.id as number;
    const berkeleyId = Array.from(this.locations.values()).find(l => l.citySlug === "berkeley" && l.stateCode === "ca")?.id as number;
    
    const healthSafetyCatId = Array.from(this.requirementCategories.values()).find(c => c.slug === "health-safety")?.id as number;
    const fireSafetyCatId = Array.from(this.requirementCategories.values()).find(c => c.slug === "fire-safety")?.id as number;
    const licensingCatId = Array.from(this.requirementCategories.values()).find(c => c.slug === "licensing")?.id as number;
    
    // Compliance Requirements
    const requirements: InsertComplianceRequirement[] = [
      {
        title: "Food Handler Certification",
        description: "All staff handling food must complete a certified food safety program.",
        urgency: "Critical",
        timeframe: "Due within 30 days of employment",
        categoryId: healthSafetyCatId,
        businessTypeId: restaurantId,
        locationId: providenceId
      },
      {
        title: "Health Department Inspection",
        description: "Regular inspection required by local health department to ensure food safety standards.",
        urgency: "Critical",
        timeframe: "Annual requirement",
        categoryId: healthSafetyCatId,
        businessTypeId: restaurantId,
        locationId: providenceId
      },
      {
        title: "Fire Inspection Certification",
        description: "Business premises must pass fire safety inspection by local fire department.",
        urgency: "Critical",
        timeframe: "Annual requirement",
        categoryId: fireSafetyCatId,
        businessTypeId: restaurantId,
        locationId: providenceId
      },
      {
        title: "Restaurant Operation License",
        description: "Business license specific to food service establishments.",
        urgency: "Critical",
        timeframe: "Must be obtained before opening",
        categoryId: licensingCatId,
        businessTypeId: restaurantId,
        locationId: providenceId
      }
    ];
    
    for (const req of requirements) {
      const id = this.requirementIdCounter++;
      this.complianceRequirements.set(id, { ...req, id });
    }
    
    // Service Providers
    const providers: InsertServiceProvider[] = [
      {
        name: "SafeServ Certification",
        description: "Online certification course for food handlers with same-day certification.",
        categoryId: healthSafetyCatId,
        locationText: "Providence, RI",
        rating: 5,
        reviewCount: 124,
        price: "$89",
        certification: "Certified by RI Department of Health"
      },
      {
        name: "RI Food Safety Institute",
        description: "In-person training and certification for restaurant staff with group discounts.",
        categoryId: healthSafetyCatId,
        locationText: "Providence, RI",
        rating: 4,
        reviewCount: 94,
        price: "$75",
        certification: "Certified by RI Department of Health"
      },
      {
        name: "PreInspect Pro",
        description: "Pre-inspection consultation and preparation to ensure you pass official health inspections.",
        categoryId: healthSafetyCatId,
        locationText: "Statewide, RI",
        rating: 5,
        reviewCount: 203,
        price: "$250",
        certification: "Former Health Inspectors on Staff"
      },
      {
        name: "FireSafe Consultants",
        description: "Pre-inspection assessment and fire safety planning for restaurants.",
        categoryId: fireSafetyCatId,
        locationText: "Providence, RI",
        rating: 4,
        reviewCount: 87,
        price: "$175",
        certification: "Licensed by RI State Fire Marshal"
      },
      {
        name: "Total Fire Protection",
        description: "Comprehensive fire safety equipment inspection and certification services.",
        categoryId: fireSafetyCatId,
        locationText: "Statewide, RI",
        rating: 5,
        reviewCount: 118,
        price: "$220",
        certification: "State Licensed Fire Safety Specialists"
      },
      {
        name: "BizPermit Experts",
        description: "Full-service business license and permit acquisition for new restaurants.",
        categoryId: licensingCatId,
        locationText: "Providence, RI",
        rating: 5,
        reviewCount: 156,
        price: "$350",
        certification: "Registered Business Consultants"
      }
    ];
    
    for (const provider of providers) {
      const id = this.providerIdCounter++;
      this.serviceProviders.set(id, { ...provider, id });
    }
    
    // Provider-Requirement relationships
    // For each requirement, find providers in the same category and create relationships
    for (const requirement of this.complianceRequirements.values()) {
      const matchingProviders = Array.from(this.serviceProviders.values())
        .filter(provider => provider.categoryId === requirement.categoryId);
      
      for (const provider of matchingProviders) {
        const id = this.providerRequirementIdCounter++;
        this.providerRequirements.set(id, {
          id,
          providerId: provider.id,
          requirementId: requirement.id
        });
      }
    }
  }
  
  // Business Type methods
  async getBusinessTypes(): Promise<BusinessType[]> {
    return Array.from(this.businessTypes.values());
  }
  
  async getBusinessTypeBySlug(slug: string): Promise<BusinessType | undefined> {
    return Array.from(this.businessTypes.values()).find(bt => bt.slug === slug);
  }
  
  // Location methods
  async getLocationsByState(stateCode: string): Promise<Location[]> {
    return Array.from(this.locations.values())
      .filter(location => location.stateCode === stateCode);
  }
  
  async getLocation(stateCode: string, citySlug: string): Promise<Location | undefined> {
    return Array.from(this.locations.values())
      .find(location => location.stateCode === stateCode && location.citySlug === citySlug);
  }
  
  // Requirement Category methods
  async getRequirementCategories(): Promise<RequirementCategory[]> {
    return Array.from(this.requirementCategories.values());
  }
  
  // Compliance Requirement methods
  async getRequirementsByBusinessAndLocation(businessTypeId: number, locationId: number): Promise<ComplianceRequirement[]> {
    return Array.from(this.complianceRequirements.values())
      .filter(req => req.businessTypeId === businessTypeId && req.locationId === locationId);
  }
  
  async getRequirementsByCategory(categoryId: number): Promise<ComplianceRequirement[]> {
    return Array.from(this.complianceRequirements.values())
      .filter(req => req.categoryId === categoryId);
  }
  
  // Service Provider methods
  async getProviders(): Promise<ServiceProvider[]> {
    return Array.from(this.serviceProviders.values());
  }
  
  async getProvidersByRequirement(requirementId: number): Promise<ServiceProvider[]> {
    const matchingRelationships = Array.from(this.providerRequirements.values())
      .filter(rel => rel.requirementId === requirementId);
    
    const providerIds = matchingRelationships.map(rel => rel.providerId);
    return Array.from(this.serviceProviders.values())
      .filter(provider => providerIds.includes(provider.id));
  }
  
  async getProvidersByCategory(categoryId: number): Promise<ServiceProvider[]> {
    return Array.from(this.serviceProviders.values())
      .filter(provider => provider.categoryId === categoryId);
  }
}

export const storage = new MemStorage();
