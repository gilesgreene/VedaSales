/**
 * Trend Score Algorithm
 * Calculate trend score (0-100) as a weighted composite:
 * - Google Trends 30-day average interest: 40% weight
 * - Reddit mention velocity (mentions/week): 25% weight
 * - YouTube view count on recent videos: 20% weight
 * - Etsy listing count growth: 15% weight
 */

interface TrendSignals {
  googleTrendsScore: number; // 0-100
  redditMentionsPerWeek: number;
  youtubeViewsRecent: number;
  etsyListingGrowth: number; // percentage
}

export function calculateTrendScore(signals: TrendSignals): number {
  // Normalization thresholds (example values)
  const REDDIT_MAX = 50; // 50+ mentions/week is 100
  const YOUTUBE_MAX = 100000; // 100k views is 100
  const ETSY_GROWTH_MAX = 50; // 50% growth is 100

  const redditScore = Math.min((signals.redditMentionsPerWeek / REDDIT_MAX) * 100, 100);
  const youtubeScore = Math.min((signals.youtubeViewsRecent / YOUTUBE_MAX) * 100, 100);
  const etsyScore = Math.min((signals.etsyListingGrowth / ETSY_GROWTH_MAX) * 100, 100);

  const weightedScore = (
    (signals.googleTrendsScore * 0.40) +
    (redditScore * 0.25) +
    (youtubeScore * 0.20) +
    (etsyScore * 0.15)
  );

  return Math.round(weightedScore);
}

export function getTrendDirection(currentScore: number, previousScore: number): 'rising' | 'stable' | 'declining' {
  const diff = currentScore - previousScore;
  if (diff > 5) return 'rising';
  if (diff < -5) return 'declining';
  return 'stable';
}
