// Client-side utility functions for OpenAI integration
// Note: This file is for any client-side OpenAI-related utilities if needed in the future

export interface InstagramAnalysisRequest {
  url: string;
}

export interface SkinAnalysisResponse {
  overallScore: number;
  moistureLevel: number;
  oilLevel: number;
  troubleLevel: number;
  recommendations: string[];
}

// Utility function to validate Instagram URLs
export function isValidInstagramUrl(url: string): boolean {
  const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel)\/[a-zA-Z0-9_-]+\/?(\?.*)?$/;
  return instagramRegex.test(url);
}

// Utility function to format SEO score
export function formatSeoScore(score: number): string {
  if (score >= 90) return "우수";
  if (score >= 80) return "좋음";
  if (score >= 70) return "보통";
  return "개선 필요";
}

// Utility function to get SEO score color class
export function getSeoScoreColor(score: number): string {
  if (score >= 90) return "text-emerald-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
}
