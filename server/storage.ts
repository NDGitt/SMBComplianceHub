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
    // Business Types - Berkeley specific
    const businessTypes: InsertBusinessType[] = [
      { name: "Restaurant", slug: "restaurant" },
      { name: "Daycare", slug: "daycare" },
      { name: "Salon", slug: "salon" }
    ];
    
    for (const bt of businessTypes) {
      const id = this.businessTypeIdCounter++;
      this.businessTypes.set(id, { ...bt, id });
    }
    
    // Locations - Only Berkeley
    const locations: InsertLocation[] = [
      { state: "California", stateCode: "ca", city: "Berkeley", citySlug: "berkeley" }
    ];
    
    for (const loc of locations) {
      const id = this.locationIdCounter++;
      this.locations.set(id, { ...loc, id });
    }
    
    // Requirement Categories - Based on Berkeley compliance data
    const categories: InsertRequirementCategory[] = [
      { name: "City Requirements", slug: "city" },
      { name: "State Requirements", slug: "state" },
      { name: "Federal Requirements", slug: "federal" },
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
    const businessTypesArray = Array.from(this.businessTypes.values());
    const restaurantId = businessTypesArray.find(bt => bt.slug === "restaurant")?.id as number;
    const daycareId = businessTypesArray.find(bt => bt.slug === "daycare")?.id as number;
    const salonId = businessTypesArray.find(bt => bt.slug === "salon")?.id as number;
    
    const locationsArray = Array.from(this.locations.values());
    const berkeleyId = locationsArray.find(l => l.citySlug === "berkeley")?.id as number;
    
    const categoriesArray = Array.from(this.requirementCategories.values());
    const cityCatId = categoriesArray.find(c => c.slug === "city")?.id as number;
    const stateCatId = categoriesArray.find(c => c.slug === "state")?.id as number;
    const federalCatId = categoriesArray.find(c => c.slug === "federal")?.id as number;
    const healthSafetyCatId = categoriesArray.find(c => c.slug === "health-safety")?.id as number;
    const fireSafetyCatId = categoriesArray.find(c => c.slug === "fire-safety")?.id as number;
    const licensingCatId = categoriesArray.find(c => c.slug === "licensing")?.id as number;
    const employmentCatId = categoriesArray.find(c => c.slug === "employment")?.id as number;
    
    // Compliance Requirements for Restaurants in Berkeley
    const restaurantRequirements: InsertComplianceRequirement[] = [
      {
        title: "City Business License",
        description: "All businesses in Berkeley must obtain a city business license (business tax certificate) before operating.",
        urgency: "Critical",
        timeframe: "Before opening, renewed annually by Dec 31",
        categoryId: cityCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Zoning Approval",
        description: "Proof of zoning compliance is required for the business location. Most restaurants need a Zoning Certificate confirming the site is zoned for restaurant use.",
        urgency: "Critical",
        timeframe: "Before opening",
        categoryId: cityCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Health Permit (Food Service Establishment Permit)",
        description: "Restaurants must obtain a health permit from Berkeley's Environmental Health Division before opening. This permit certifies compliance with food safety regulations.",
        urgency: "Critical",
        timeframe: "Before opening, renewed annually",
        categoryId: healthSafetyCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Fire Department Inspection",
        description: "The Berkeley Fire Department must inspect the restaurant premises for fire and life safety compliance. This verifies extinguishers, exits, alarms, and kitchen hood suppression are compliant.",
        urgency: "Critical",
        timeframe: "Before opening, periodic inspections",
        categoryId: fireSafetyCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Sign Permit",
        description: "If the restaurant will have external signage, a City sign permit and design review approval are required.",
        urgency: "Medium",
        timeframe: "Before installing any signage",
        categoryId: cityCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Berkeley Minimum Wage & Paid Sick Leave",
        description: "Berkeley's local labor ordinances require employers to pay a minimum wage (currently $18.67/hour as of July 1, 2024) and provide paid sick leave to employees.",
        urgency: "Critical",
        timeframe: "Ongoing compliance",
        categoryId: employmentCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Seller's Permit (Sales Tax)",
        description: "A California Seller's Permit is required for businesses that sell tangible goods. Restaurants must obtain this state permit to legally collect and remit sales tax.",
        urgency: "Critical",
        timeframe: "Before opening",
        categoryId: stateCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Food Handler Cards",
        description: "California law requires all food handling employees to obtain a California Food Handler Card within 30 days of hire.",
        urgency: "Critical",
        timeframe: "Within 30 days of hire for each employee",
        categoryId: stateCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Certified Food Safety Manager",
        description: "Each food establishment must have at least one owner or employee who has passed an accredited Food Protection Manager exam.",
        urgency: "Critical",
        timeframe: "Within 60 days of opening",
        categoryId: stateCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      },
      {
        title: "Alcohol License (if serving alcohol)",
        description: "If serving beer, wine, or spirits, the restaurant must secure the appropriate license from California ABC.",
        urgency: "Critical",
        timeframe: "Before serving alcohol, renewed annually",
        categoryId: stateCatId,
        businessTypeId: restaurantId,
        locationId: berkeleyId
      }
    ];

    // Daycare requirements in Berkeley
    const daycareRequirements: InsertComplianceRequirement[] = [
      {
        title: "City Business License",
        description: "Any daycare operating in Berkeley (including home-based child care) must obtain a Berkeley business license.",
        urgency: "Critical",
        timeframe: "Before opening, renewed annually",
        categoryId: cityCatId,
        businessTypeId: daycareId,
        locationId: berkeleyId
      },
      {
        title: "Zoning Compliance",
        description: "Daycares must comply with Berkeley zoning regulations. Small family daycares are permitted in residential zones, but larger operations may require special permits.",
        urgency: "Critical",
        timeframe: "Before opening",
        categoryId: cityCatId,
        businessTypeId: daycareId,
        locationId: berkeleyId
      },
      {
        title: "State Child Care License",
        description: "All child care facilities must be licensed by the California Department of Social Services, Community Care Licensing Division.",
        urgency: "Critical",
        timeframe: "Before opening",
        categoryId: stateCatId,
        businessTypeId: daycareId,
        locationId: berkeleyId
      },
      {
        title: "Fire Clearance",
        description: "Daycare facilities require fire clearance from the Berkeley Fire Department, confirming the facility meets fire safety standards.",
        urgency: "Critical",
        timeframe: "Before opening, renewed periodically",
        categoryId: fireSafetyCatId,
        businessTypeId: daycareId,
        locationId: berkeleyId
      }
    ];
    
    // Salon requirements in Berkeley
    const salonRequirements: InsertComplianceRequirement[] = [
      {
        title: "City Business License",
        description: "All salons operating in Berkeley must obtain a city business license.",
        urgency: "Critical",
        timeframe: "Before opening, renewed annually",
        categoryId: cityCatId,
        businessTypeId: salonId,
        locationId: berkeleyId
      },
      {
        title: "Zoning Compliance",
        description: "Salons must comply with Berkeley zoning regulations. Most commercial zones allow salon businesses, but verification is needed.",
        urgency: "Critical",
        timeframe: "Before opening",
        categoryId: cityCatId,
        businessTypeId: salonId,
        locationId: berkeleyId
      },
      {
        title: "State Cosmetology Establishment License",
        description: "The salon must be licensed by the California Board of Barbering and Cosmetology.",
        urgency: "Critical",
        timeframe: "Before opening, renewed every 2 years",
        categoryId: stateCatId,
        businessTypeId: salonId,
        locationId: berkeleyId
      },
      {
        title: "Individual Practitioner Licenses",
        description: "Every cosmetologist, barber, manicurist, esthetician, or other beauty practitioner must hold a valid California license for their specialty.",
        urgency: "Critical",
        timeframe: "Before performing services",
        categoryId: stateCatId,
        businessTypeId: salonId,
        locationId: berkeleyId
      },
      {
        title: "Sign Permit",
        description: "A salon installing a new outdoor sign must obtain a sign permit and design review approval from the City.",
        urgency: "Medium",
        timeframe: "Before installing signage",
        categoryId: cityCatId,
        businessTypeId: salonId,
        locationId: berkeleyId
      }
    ];
    
    // Combine all requirements
    const requirements = [...restaurantRequirements, ...daycareRequirements, ...salonRequirements];
    
    for (const req of requirements) {
      const id = this.requirementIdCounter++;
      this.complianceRequirements.set(id, { ...req, id });
    }
    
    // Service Providers for Berkeley
    const providers: InsertServiceProvider[] = [
      // City requirement providers
      {
        name: "Berkeley Business License Assistance",
        description: "Streamlined assistance for obtaining Berkeley business licenses with guidance on local regulations.",
        categoryId: cityCatId,
        locationText: "Berkeley, CA",
        rating: 5,
        reviewCount: 142,
        price: "$150-300",
        certification: "City-Recognized Business Consultant"
      },
      {
        name: "Berkeley Zoning Experts",
        description: "Specialized consulting on Berkeley zoning compliance and permit application assistance.",
        categoryId: cityCatId,
        locationText: "Berkeley, CA",
        rating: 4.8,
        reviewCount: 87,
        price: "$200-500",
        certification: "Certified Urban Planning Consultants"
      },
      
      // Health & Safety providers
      {
        name: "Safe Food Berkeley",
        description: "Comprehensive food safety training and health permit application assistance for Berkeley restaurants.",
        categoryId: healthSafetyCatId,
        locationText: "Berkeley, CA",
        rating: 4.9,
        reviewCount: 112,
        price: "$95-250",
        certification: "Berkeley Health Department Approved"
      },
      {
        name: "Bay Area Health Compliance",
        description: "Pre-inspection consultations and compliance guidance for food establishments.",
        categoryId: healthSafetyCatId,
        locationText: "Berkeley, CA",
        rating: 4.7,
        reviewCount: 78,
        price: "$175-350",
        certification: "Former Health Inspectors on Staff"
      },
      
      // Fire Safety providers
      {
        name: "Berkeley Fire Safety Consultants",
        description: "Expert guidance on passing Berkeley Fire Department inspections with pre-inspection assessments.",
        categoryId: fireSafetyCatId,
        locationText: "Berkeley, CA",
        rating: 4.8,
        reviewCount: 63,
        price: "$200-400",
        certification: "Former Berkeley Fire Department Personnel"
      },
      {
        name: "East Bay Fire Protection Services",
        description: "Complete fire safety equipment installation, maintenance, and certification services.",
        categoryId: fireSafetyCatId,
        locationText: "Berkeley, CA",
        rating: 4.9,
        reviewCount: 129,
        price: "$150-600",
        certification: "State Licensed Fire Safety Specialists"
      },
      
      // State requirement providers
      {
        name: "California Licensing Experts",
        description: "Assistance with all California state licensing requirements including ABC, Board of Cosmetology, and childcare licensing.",
        categoryId: stateCatId,
        locationText: "Berkeley, CA",
        rating: 4.8,
        reviewCount: 156,
        price: "$250-800",
        certification: "Licensed Business Consultants"
      },
      {
        name: "ServSafe California",
        description: "Official food handler certification and food safety manager training programs.",
        categoryId: stateCatId,
        locationText: "Online & Berkeley, CA",
        rating: 4.7,
        reviewCount: 203,
        price: "$89-179",
        certification: "Nationally Recognized Certification"
      },
      
      // Employment compliance providers  
      {
        name: "Berkeley Labor Compliance Services",
        description: "Ensure compliance with Berkeley's minimum wage, paid sick leave, and other local labor ordinances.",
        categoryId: employmentCatId,
        locationText: "Berkeley, CA",
        rating: 4.6,
        reviewCount: 47,
        price: "$125-300",
        certification: "Certified Labor Specialists"
      }
    ];
    
    for (const provider of providers) {
      const id = this.providerIdCounter++;
      this.serviceProviders.set(id, { ...provider, id });
    }
    
    // Provider-Requirement relationships
    // For each requirement, find providers in the same category and create relationships
    const requirementsArray = Array.from(this.complianceRequirements.values());
    for (const requirement of requirementsArray) {
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
