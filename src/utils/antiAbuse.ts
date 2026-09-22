// Anti-abuse utilities: Rate limiting, Profanity/Spam filter, and Abuse Reporting

const RATE_LIMIT_HOURLY_MAX = 10;
const STORAGE_KEY_RATE_LIMIT = 'agentic_awards_rate_limits';
const STORAGE_KEY_FLAGGED_REVIEWS = 'agentic_awards_flagged_reviews';

interface RateLimitRecord {
  timestamps: number[];
}

export function checkReviewRateLimit(userId: string): { allowed: boolean; waitMinutes?: number; remainingCount: number } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RATE_LIMIT);
    const store: Record<string, RateLimitRecord> = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const userTimestamps = (store[userId]?.timestamps || []).filter(t => t > oneHourAgo);

    if (userTimestamps.length >= RATE_LIMIT_HOURLY_MAX) {
      const oldestInWindow = Math.min(...userTimestamps);
      const waitMinutes = Math.ceil((oldestInWindow + 60 * 60 * 1000 - now) / (60 * 1000));
      return {
        allowed: false,
        waitMinutes: Math.max(1, waitMinutes),
        remainingCount: 0
      };
    }

    return {
      allowed: true,
      remainingCount: RATE_LIMIT_HOURLY_MAX - userTimestamps.length
    };
  } catch (e) {
    return { allowed: true, remainingCount: RATE_LIMIT_HOURLY_MAX };
  }
}

export function recordReviewAction(userId: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RATE_LIMIT);
    const store: Record<string, RateLimitRecord> = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const userTimestamps = (store[userId]?.timestamps || []).filter(t => t > oneHourAgo);
    userTimestamps.push(now);

    store[userId] = { timestamps: userTimestamps };
    localStorage.setItem(STORAGE_KEY_RATE_LIMIT, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to update rate limit store', e);
  }
}

// Basic Profanity & Spam Filter
const BANNED_PATTERNS = [
  /\b(fuck|shit|bitch|asshole|cunt|dick|bastard|nigger|faggot)\b/i,
  /\b(viagra|cialis|crypto\s*airdrop|buy\s*followers|free\s*crypto|telegram\s*channel|whatsapp\s*\+)\b/i,
  /\b(casino|betting|slot\s*machine|poker\s*online)\b/i
];

export function filterReviewText(text: string): { isValid: boolean; error?: string } {
  const trimmed = text.trim();
  
  if (trimmed.length < 20) {
    return {
      isValid: false,
      error: `Written review must be at least 20 characters long (currently ${trimmed.length} characters).`
    };
  }

  // Check for repeated spam characters or words (e.g. "aaaaa" or "great great great great")
  if (/(.)\1{9,}/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Review contains repetitive spam characters.'
    };
  }

  // Check banned profanity & spam words
  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isValid: false,
        error: 'Review contains inappropriate language or promotional spam triggers.'
      };
    }
  }

  // Check excessive URLs (more than 2 links in a single short review)
  const urlMatches = trimmed.match(/https?:\/\/[^\s]+/g);
  if (urlMatches && urlMatches.length > 2) {
    return {
      isValid: false,
      error: 'Review contains too many external links.'
    };
  }

  return { isValid: true };
}

export interface FlaggedReport {
  id: string;
  reviewId: string;
  agentId: string;
  reportedByUserId: string;
  reason: string;
  timestamp: string;
  status: 'pending_moderation' | 'dismissed' | 'removed';
}

export function reportReview(reviewId: string, agentId: string, reportedByUserId: string, reason: string): FlaggedReport {
  const report: FlaggedReport = {
    id: `flag-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    reviewId,
    agentId,
    reportedByUserId,
    reason,
    timestamp: new Date().toISOString(),
    status: 'pending_moderation'
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_FLAGGED_REVIEWS);
    const flags: FlaggedReport[] = raw ? JSON.parse(raw) : [];
    flags.push(report);
    localStorage.setItem(STORAGE_KEY_FLAGGED_REVIEWS, JSON.stringify(flags));
  } catch (e) {
    console.error('Failed to save flag report', e);
  }

  return report;
}
