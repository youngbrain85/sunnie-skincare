import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // "admin" or "user"
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  seoKeywords: text("seo_keywords").array().notNull(),
  thumbnailUrl: text("thumbnail_url"),
  platform: text("platform").notNull().default("basic"), // basic, naver, tistory
  customImages: text("custom_images").array().notNull().default([]), // URLs of uploaded images
  status: text("status").notNull().default("draft"), // draft, published
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  seoScore: integer("seo_score").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Company services table for showcasing what Sunnie Code offers
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  features: text("features").array().notNull(),
  isActive: boolean("is_active").notNull().default(true),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Company portfolio/case studies
export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  projectUrl: text("project_url"),
  technologies: text("technologies").array().notNull(),
  category: text("category").notNull(), // web-development, ai-solutions, marketing, etc.
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const skinAnalyses = pgTable("skin_analyses", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  overallScore: integer("overall_score").notNull(),
  moistureLevel: integer("moisture_level").notNull(),
  oilLevel: integer("oil_level").notNull(),
  troubleLevel: integer("trouble_level").notNull(),
  recommendations: text("recommendations").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Blog Post schemas
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBlogPostSchema = insertBlogPostSchema.partial();

// Skin Analysis schemas
export const insertSkinAnalysisSchema = createInsertSchema(skinAnalyses).omit({
  id: true,
  createdAt: true,
});

// Manual Blog Content schema
export const manualBlogContentSchema = z.object({
  contentOutline: z.string().min(50, "내용 개요는 최소 50자 이상 입력해주세요"),
  beforeAfterImages: z.array(z.string()).min(1, "비포 애프터 이미지를 최소 1개 업로드해주세요"),
  productImages: z.array(z.string()).optional(),
  overviewImages: z.array(z.string()).optional(),
  targetKeywords: z.array(z.string()).optional(),
  skinType: z.enum(["dry", "oily", "combination", "sensitive", "normal"]).optional(),
  treatmentType: z.enum(["acne", "aging", "pigmentation", "hydration", "pore", "sensitive"]).optional()
});

// Service schemas
export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

// Portfolio schemas
export const insertPortfolioSchema = createInsertSchema(portfolio).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;

export type SkinAnalysis = typeof skinAnalyses.$inferSelect;
export type InsertSkinAnalysis = z.infer<typeof insertSkinAnalysisSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Portfolio = typeof portfolio.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;

export type ManualBlogContentRequest = z.infer<typeof manualBlogContentSchema>;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});
