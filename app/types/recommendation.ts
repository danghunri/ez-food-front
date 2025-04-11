export interface RecommendationInput {
  foodType?: string;
  serviceType?: string;
  mealTime?: string;
  purpose?: string;
  date?: string | null;
  location?: string | null;
  weather?: string | null;
  temperature?: number | null;
}

export interface RecommendationResult {
  reason: string;
  recommendations: {
    name: string;
    description?: string;
    score?: number;
  }[];
}
