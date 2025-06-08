import { 
  users, 
  blogPosts, 
  skinAnalyses,
  services,
  portfolio,
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type UpdateBlogPost,
  type SkinAnalysis,
  type InsertSkinAnalysis,
  type Service,
  type InsertService,
  type Portfolio,
  type InsertPortfolio
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog Post methods
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, updates: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Skin Analysis methods
  createSkinAnalysis(analysis: InsertSkinAnalysis): Promise<SkinAnalysis>;
  getSkinAnalyses(): Promise<SkinAnalysis[]>;
  getSkinAnalysis(id: number): Promise<SkinAnalysis | undefined>;

  // Service methods
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, updates: Partial<InsertService>): Promise<Service | undefined>;

  // Portfolio methods
  getPortfolio(): Promise<Portfolio[]>;
  createPortfolio(item: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: number, updates: Partial<InsertPortfolio>): Promise<Portfolio | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private skinAnalyses: Map<number, SkinAnalysis>;
  private services: Map<number, Service>;
  private portfolio: Map<number, Portfolio>;
  private currentUserId: number;
  private currentBlogPostId: number;
  private currentSkinAnalysisId: number;
  private currentServiceId: number;
  private currentPortfolioId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.skinAnalyses = new Map();
    this.services = new Map();
    this.portfolio = new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    this.currentSkinAnalysisId = 1;
    this.currentServiceId = 1;
    this.currentPortfolioId = 1;

    // Initialize with demo services and portfolio
    this.initializeDemoData();
  }

  private async initializeDemoData() {
    // Demo services for Sunnie Skincare
    await this.createService({
      title: "AI 피부 진단",
      description: "첨단 AI 기술을 활용한 정확한 피부 상태 분석과 맞춤형 케어 솔루션을 제공합니다.",
      icon: "Camera",
      features: ["실시간 피부 분석", "맞춤형 케어 추천", "피부 타입 진단", "개선 효과 추적"],
      isActive: true,
      order: 1
    });

    await this.createService({
      title: "1:1 전문 상담",
      description: "5년 경력의 전문 피부관리사와의 개인별 맞춤 상담으로 최적의 케어 플랜을 제공합니다.",
      icon: "MessageCircle",
      features: ["개인별 맞춤 상담", "전문가 케어 플랜", "실시간 Q&A", "사후 관리 서비스"],
      isActive: true,
      order: 2
    });

    await this.createService({
      title: "제품 추천 서비스",
      description: "개인의 피부 타입과 고민에 최적화된 검증된 제품들을 추천해드립니다.",
      icon: "Heart",
      features: ["피부 타입별 추천", "성분 분석", "가격대별 옵션", "리뷰 기반 선별"],
      isActive: true,
      order: 3
    });

    // Demo portfolio for Sunnie Skincare
    await this.createPortfolio({
      title: "민감성 피부 케어 성공 사례",
      description: "6개월간의 전문 케어를 통해 민감성 피부가 건강한 피부로 개선된 고객 사례",
      imageUrl: null,
      projectUrl: null,
      technologies: ["전문 케어", "맞춤 제품", "피부 분석", "사후 관리"],
      category: "skincare-success",
      isActive: true
    });

    await this.createPortfolio({
      title: "E-commerce 솔루션",
      description: "모바일 최적화된 온라인 쇼핑몰 플랫폼으로 높은 전환율을 달성",
      imageUrl: null,
      projectUrl: null,
      technologies: ["Next.js", "PostgreSQL", "Stripe", "Tailwind"],
      category: "web-development",
      isActive: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "user"
    };
    this.users.set(id, user);
    return user;
  }

  // Blog Post methods
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    const filtered = published !== undefined 
      ? posts.filter(post => published ? post.status === "published" : post.status === "draft")
      : posts;
    
    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const post: BlogPost = { 
      title: insertPost.title,
      content: insertPost.content,
      excerpt: insertPost.excerpt,
      seoKeywords: insertPost.seoKeywords,
      thumbnailUrl: insertPost.thumbnailUrl || null,
      platform: insertPost.platform || "basic",
      customImages: insertPost.customImages || [],
      status: insertPost.status || "draft",
      views: insertPost.views || 0,
      likes: insertPost.likes || 0,
      seoScore: insertPost.seoScore || 0,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, updates: UpdateBlogPost): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: BlogPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date()
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Skin Analysis methods
  async createSkinAnalysis(insertAnalysis: InsertSkinAnalysis): Promise<SkinAnalysis> {
    const id = this.currentSkinAnalysisId++;
    const analysis: SkinAnalysis = {
      ...insertAnalysis,
      id,
      createdAt: new Date()
    };
    this.skinAnalyses.set(id, analysis);
    return analysis;
  }

  async getSkinAnalyses(): Promise<SkinAnalysis[]> {
    return Array.from(this.skinAnalyses.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getSkinAnalysis(id: number): Promise<SkinAnalysis | undefined> {
    return this.skinAnalyses.get(id);
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(service => service.isActive)
      .sort((a, b) => a.order - b.order);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = {
      title: insertService.title,
      description: insertService.description,
      icon: insertService.icon,
      features: insertService.features,
      isActive: insertService.isActive ?? true,
      order: insertService.order ?? 0,
      id,
      createdAt: new Date()
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, updates: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;

    const updatedService: Service = {
      ...existingService,
      ...updates
    };
    this.services.set(id, updatedService);
    return updatedService;
  }

  // Portfolio methods
  async getPortfolio(): Promise<Portfolio[]> {
    return Array.from(this.portfolio.values())
      .filter(item => item.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = this.currentPortfolioId++;
    const portfolioItem: Portfolio = {
      title: insertPortfolio.title,
      description: insertPortfolio.description,
      imageUrl: insertPortfolio.imageUrl ?? null,
      projectUrl: insertPortfolio.projectUrl ?? null,
      technologies: insertPortfolio.technologies,
      category: insertPortfolio.category,
      isActive: insertPortfolio.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.portfolio.set(id, portfolioItem);
    return portfolioItem;
  }

  async updatePortfolio(id: number, updates: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    const existingItem = this.portfolio.get(id);
    if (!existingItem) return undefined;

    const updatedItem: Portfolio = {
      ...existingItem,
      ...updates
    };
    this.portfolio.set(id, updatedItem);
    return updatedItem;
  }
}

export const storage = new MemStorage();
