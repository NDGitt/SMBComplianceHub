import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Business Types
export const businessTypes = pgTable("business_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertBusinessTypeSchema = createInsertSchema(businessTypes).omit({
  id: true,
});

// Locations
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  state: text("state").notNull(),
  stateCode: text("state_code").notNull(),
  city: text("city").notNull(),
  citySlug: text("city_slug").notNull(),
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
});

// Requirement Categories
export const requirementCategories = pgTable("requirement_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const insertRequirementCategorySchema = createInsertSchema(requirementCategories).omit({
  id: true,
});

// Compliance Requirements
export const complianceRequirements = pgTable("compliance_requirements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  urgency: text("urgency").notNull(), // Critical, Important, Standard
  timeframe: text("timeframe").notNull(),
  categoryId: integer("category_id").notNull(),
  businessTypeId: integer("business_type_id").notNull(),
  locationId: integer("location_id").notNull(),
});

export const insertComplianceRequirementSchema = createInsertSchema(complianceRequirements).omit({
  id: true,
});

// Service Providers
export const serviceProviders = pgTable("service_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull(),
  locationText: text("location_text").notNull(),
  rating: integer("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  price: text("price").notNull(),
  certification: text("certification").notNull(),
});

export const insertServiceProviderSchema = createInsertSchema(serviceProviders).omit({
  id: true,
});

// Provider Requirements (Junction table for M:M relationship)
export const providerRequirements = pgTable("provider_requirements", {
  id: serial("id").primaryKey(),
  providerId: integer("provider_id").notNull(),
  requirementId: integer("requirement_id").notNull(),
});

export const insertProviderRequirementSchema = createInsertSchema(providerRequirements).omit({
  id: true,
});

// Types for all models
export type BusinessType = typeof businessTypes.$inferSelect;
export type InsertBusinessType = z.infer<typeof insertBusinessTypeSchema>;

export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;

export type RequirementCategory = typeof requirementCategories.$inferSelect;
export type InsertRequirementCategory = z.infer<typeof insertRequirementCategorySchema>;

export type ComplianceRequirement = typeof complianceRequirements.$inferSelect;
export type InsertComplianceRequirement = z.infer<typeof insertComplianceRequirementSchema>;

export type ServiceProvider = typeof serviceProviders.$inferSelect;
export type InsertServiceProvider = z.infer<typeof insertServiceProviderSchema>;

export type ProviderRequirement = typeof providerRequirements.$inferSelect;
export type InsertProviderRequirement = z.infer<typeof insertProviderRequirementSchema>;
