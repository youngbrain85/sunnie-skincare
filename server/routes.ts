import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { 
  manualBlogContentSchema,
  insertBlogPostSchema,
  updateBlogPostSchema
} from "@shared/schema";
import { generateMultiPlatformBlog, analyzeSkinImage } from "./lib/openai-new";

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Public API - Published blog posts only
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true); // Only published posts
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "블로그 포스트를 불러오는데 실패했습니다." });
    }
  });

  // Admin API - All blog posts
  app.get("/api/admin/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(); // All posts
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "블로그 포스트를 불러오는데 실패했습니다." });
    }
  });

  // Admin API - Image Upload for blog posts
  app.post("/api/admin/upload-images", upload.array('images', 5), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "이미지를 업로드해주세요." });
      }

      const files = req.files as Express.Multer.File[];
      const imageUrls = files.map(file => {
        const base64 = file.buffer.toString('base64');
        return `data:${file.mimetype};base64,${base64}`;
      });

      res.json({ imageUrls });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ message: "이미지 업로드에 실패했습니다." });
    }
  });

  // Admin API - Multi-platform blog generation with manual input
  app.post("/api/admin/generate-blog", async (req, res) => {
    try {
      const validation = manualBlogContentSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "입력 데이터가 올바르지 않습니다.",
          errors: validation.error.errors
        });
      }

      const data = validation.data;
      const multiPlatformBlog = await generateMultiPlatformBlog(data);
      
      // Create three blog posts for different platforms
      const basicBlogPost = await storage.createBlogPost({
        title: multiPlatformBlog.basic.title,
        content: multiPlatformBlog.basic.content,
        excerpt: multiPlatformBlog.basic.excerpt,
        seoKeywords: multiPlatformBlog.basic.keywords,
        customImages: [...data.beforeAfterImages, ...(data.productImages || []), ...(data.overviewImages || [])],
        status: "published",
        seoScore: multiPlatformBlog.basic.seoScore,
        platform: "basic"
      });

      res.json({
        basic: {
          blogPost: basicBlogPost,
          ...multiPlatformBlog.basic
        },
        naver: multiPlatformBlog.naver,
        tistory: multiPlatformBlog.tistory
      });
    } catch (error) {
      console.error("Multi-platform blog generation error:", error);
      res.status(500).json({ 
        message: "블로그 생성에 실패했습니다. 입력 내용을 확인해주세요." 
      });
    }
  });

  // Company Services API
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "서비스 정보를 불러오는데 실패했습니다." });
    }
  });

  // Company Portfolio API
  app.get("/api/portfolio", async (req, res) => {
    try {
      const portfolio = await storage.getPortfolio();
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "포트폴리오를 불러오는데 실패했습니다." });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "블로그 포스트를 찾을 수 없습니다." });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "블로그 포스트를 불러오는데 실패했습니다." });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "잘못된 데이터입니다." });
    }
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      if (!post) {
        return res.status(404).json({ message: "블로그 포스트를 찾을 수 없습니다." });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "잘못된 데이터입니다." });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ message: "블로그 포스트를 찾을 수 없습니다." });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "블로그 포스트 삭제에 실패했습니다." });
    }
  });

  // Removed Instagram analysis - replaced with manual blog generation

  // Skin Analysis API
  app.post("/api/analyze-skin", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "이미지를 업로드해주세요." });
      }

      const imageBuffer = req.file.buffer;
      const base64Image = imageBuffer.toString('base64');
      
      const analysis = await analyzeSkinImage(base64Image);
      
      // Save analysis to storage
      const skinAnalysis = await storage.createSkinAnalysis({
        imageUrl: `data:${req.file.mimetype};base64,${base64Image}`,
        overallScore: analysis.overallScore,
        moistureLevel: analysis.moistureLevel,
        oilLevel: analysis.oilLevel,
        troubleLevel: analysis.troubleLevel,
        recommendations: analysis.recommendations
      });

      res.json(skinAnalysis);
    } catch (error) {
      console.error("Skin analysis error:", error);
      res.status(500).json({ 
        message: "피부 분석에 실패했습니다. 다시 시도해주세요." 
      });
    }
  });

  // Skin Analysis History API
  app.get("/api/skin-analyses", async (req, res) => {
    try {
      const analyses = await storage.getSkinAnalyses();
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "피부 분석 기록을 불러오는데 실패했습니다." });
    }
  });

  // Stats API
  app.get("/api/stats", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyPosts = posts.filter(post => {
        const postDate = new Date(post.createdAt);
        return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
      });

      const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
      const avgViews = posts.length > 0 ? Math.round(totalViews / posts.length) : 0;
      
      const totalSeoScore = posts.reduce((sum, post) => sum + post.seoScore, 0);
      const avgSeoScore = posts.length > 0 ? Math.round(totalSeoScore / posts.length) : 0;

      res.json({
        totalPosts: posts.length,
        monthlyPosts: monthlyPosts.length,
        avgViews,
        avgSeoScore
      });
    } catch (error) {
      res.status(500).json({ message: "통계를 불러오는데 실패했습니다." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
