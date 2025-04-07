import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Get all business types
  app.get("/api/business-types", async (req, res) => {
    try {
      const businessTypes = await storage.getBusinessTypes();
      res.json(businessTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch business types" });
    }
  });
  
  // Get locations by state
  app.get("/api/locations/:stateCode", async (req, res) => {
    try {
      const { stateCode } = req.params;
      const locations = await storage.getLocationsByState(stateCode);
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });
  
  // Get all requirement categories
  app.get("/api/requirement-categories", async (req, res) => {
    try {
      const categories = await storage.getRequirementCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch requirement categories" });
    }
  });
  
  // Get requirements by business type and location
  app.get("/api/requirements", async (req, res) => {
    try {
      const { businessTypeId, locationId } = req.query;
      
      if (!businessTypeId || !locationId) {
        return res.status(400).json({ message: "Both businessTypeId and locationId are required" });
      }
      
      const requirements = await storage.getRequirementsByBusinessAndLocation(
        Number(businessTypeId), 
        Number(locationId)
      );
      
      // Add category information to each requirement
      const categories = await storage.getRequirementCategories();
      
      const requirementsByCategory = categories.map(category => {
        const categoryRequirements = requirements.filter(req => req.categoryId === category.id);
        return {
          category,
          requirements: categoryRequirements
        };
      }).filter(group => group.requirements.length > 0);
      
      res.json(requirementsByCategory);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch requirements" });
    }
  });
  
  // Get providers by requirement
  app.get("/api/providers/by-requirement/:requirementId", async (req, res) => {
    try {
      const { requirementId } = req.params;
      const providers = await storage.getProvidersByRequirement(Number(requirementId));
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch providers for requirement" });
    }
  });
  
  // Get all providers
  app.get("/api/providers", async (req, res) => {
    try {
      const providers = await storage.getProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch providers" });
    }
  });
  
  // Get providers with associated requirement and category information
  app.get("/api/providers-with-details", async (req, res) => {
    try {
      const providers = await storage.getProviders();
      const categories = await storage.getRequirementCategories();
      
      const providersWithCategory = providers.map(provider => {
        const category = categories.find(cat => cat.id === provider.categoryId);
        return {
          ...provider,
          categoryName: category?.name || "Unknown Category"
        };
      });
      
      res.json(providersWithCategory);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch providers with details" });
    }
  });
  
  // Get requirements with providers
  app.get("/api/requirements-with-providers", async (req, res) => {
    try {
      const { businessTypeId, locationId } = req.query;
      
      if (!businessTypeId || !locationId) {
        return res.status(400).json({ message: "Both businessTypeId and locationId are required" });
      }
      
      const requirements = await storage.getRequirementsByBusinessAndLocation(
        Number(businessTypeId), 
        Number(locationId)
      );
      
      // Get providers for each requirement
      const requirementsWithProviders = await Promise.all(
        requirements.map(async (requirement) => {
          const providers = await storage.getProvidersByRequirement(requirement.id);
          return {
            ...requirement,
            providers
          };
        })
      );
      
      // Group by category
      const categories = await storage.getRequirementCategories();
      
      const requirementsByCategory = categories.map(category => {
        const categoryRequirements = requirementsWithProviders.filter(req => req.categoryId === category.id);
        return {
          category,
          requirements: categoryRequirements
        };
      }).filter(group => group.requirements.length > 0);
      
      res.json(requirementsByCategory);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch requirements with providers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
