import type { AdvancedCompatibility } from "./zodiac-data"

export interface SavedMatch {
  id: string
  person1: {
    name: string
    sign: string
  }
  person2: {
    name: string
    sign: string
  }
  compatibility: AdvancedCompatibility
  createdAt: string
  notes?: string
}

export interface MatchAnalytics {
  totalMatches: number
  averageCompatibility: number
  scoreDistribution: Record<string, number>
  signPairings: Record<string, number>
  elementCombinations: Record<string, number>
  monthlyTrends: Array<{ month: string; averageScore: number; count: number }>
  topCompatibilities: Array<{ pairing: string; score: number }>
  insights: string[]
}

const STORAGE_KEY = "zodiac_matches"
const MAX_MATCHES = 50

export function saveMatch(match: Omit<SavedMatch, "id" | "createdAt">): SavedMatch {
  const savedMatch: SavedMatch = {
    ...match,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  const matches = getMatches()
  matches.unshift(savedMatch)

  // Keep only the most recent matches
  const trimmedMatches = matches.slice(0, MAX_MATCHES)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedMatches))
  return savedMatch
}

export function getMatches(): SavedMatch[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function getMatch(id: string): SavedMatch | null {
  const matches = getMatches()
  return matches.find((match) => match.id === id) || null
}

export function updateMatch(id: string, updates: Partial<SavedMatch>): boolean {
  const matches = getMatches()
  const index = matches.findIndex((match) => match.id === id)

  if (index === -1) return false

  matches[index] = { ...matches[index], ...updates }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches))
  return true
}

export function deleteMatch(id: string): boolean {
  const matches = getMatches()
  const filtered = matches.filter((match) => match.id !== id)

  if (filtered.length === matches.length) return false

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

export function clearMatches(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getMatchAnalytics(): MatchAnalytics {
  const matches = getMatches()

  if (matches.length === 0) {
    return {
      totalMatches: 0,
      averageCompatibility: 0,
      scoreDistribution: {},
      signPairings: {},
      elementCombinations: {},
      monthlyTrends: [],
      topCompatibilities: [],
      insights: ["No matches found. Start creating compatibility matches to see analytics!"],
    }
  }

  const totalMatches = matches.length
  const averageCompatibility = Math.round(
    matches.reduce((sum, match) => sum + match.compatibility.overall, 0) / totalMatches,
  )

  // Score distribution
  const scoreDistribution = matches.reduce(
    (acc, match) => {
      const range = getScoreRange(match.compatibility.overall)
      acc[range] = (acc[range] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Sign pairings
  const signPairings = matches.reduce(
    (acc, match) => {
      const pairing = [match.person1.sign, match.person2.sign].sort().join(" + ")
      acc[pairing] = (acc[pairing] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Element combinations
  const elementCombinations = matches.reduce(
    (acc, match) => {
      const element1 = getSignElement(match.person1.sign)
      const element2 = getSignElement(match.person2.sign)
      const combo = [element1, element2].sort().join(" + ")
      acc[combo] = (acc[combo] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Monthly trends
  const monthlyData = matches.reduce(
    (acc, match) => {
      const month = new Date(match.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
      if (!acc[month]) {
        acc[month] = { total: 0, count: 0 }
      }
      acc[month].total += match.compatibility.overall
      acc[month].count += 1
      return acc
    },
    {} as Record<string, { total: number; count: number }>,
  )

  const monthlyTrends = Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      averageScore: Math.round(data.total / data.count),
      count: data.count,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())

  // Top compatibilities
  const topCompatibilities = matches
    .map((match) => ({
      pairing: `${match.person1.name || match.person1.sign} + ${match.person2.name || match.person2.sign}`,
      score: match.compatibility.overall,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  // Generate insights
  const insights = generateInsights(matches, averageCompatibility, signPairings, elementCombinations)

  return {
    totalMatches,
    averageCompatibility,
    scoreDistribution,
    signPairings,
    elementCombinations,
    monthlyTrends,
    topCompatibilities,
    insights,
  }
}

function getScoreRange(score: number): string {
  if (score >= 90) return "Excellent (90-100%)"
  if (score >= 80) return "Very Good (80-89%)"
  if (score >= 70) return "Good (70-79%)"
  if (score >= 60) return "Fair (60-69%)"
  return "Challenging (Below 60%)"
}

function getSignElement(sign: string): string {
  const elements: Record<string, string> = {
    aries: "Fire",
    leo: "Fire",
    sagittarius: "Fire",
    taurus: "Earth",
    virgo: "Earth",
    capricorn: "Earth",
    gemini: "Air",
    libra: "Air",
    aquarius: "Air",
    cancer: "Water",
    scorpio: "Water",
    pisces: "Water",
  }
  return elements[sign] || "Unknown"
}

function generateInsights(
  matches: SavedMatch[],
  averageCompatibility: number,
  signPairings: Record<string, number>,
  elementCombinations: Record<string, number>,
): string[] {
  const insights: string[] = []

  // Average compatibility insight
  if (averageCompatibility >= 80) {
    insights.push("You tend to form highly compatible relationships! Your matches show strong cosmic harmony.")
  } else if (averageCompatibility >= 70) {
    insights.push("Your relationships show good compatibility with room for growth and understanding.")
  } else {
    insights.push("Your matches suggest you're drawn to challenging but potentially transformative relationships.")
  }

  // Most common pairing
  const topPairing = Object.entries(signPairings).sort(([, a], [, b]) => b - a)[0]
  if (topPairing && topPairing[1] > 1) {
    insights.push(`You're most drawn to ${topPairing[0]} pairings, appearing ${topPairing[1]} times in your matches.`)
  }

  // Element preference
  const topElement = Object.entries(elementCombinations).sort(([, a], [, b]) => b - a)[0]
  if (topElement) {
    insights.push(`${topElement[0]} combinations appear most frequently in your compatibility history.`)
  }

  // Recent activity
  const recentMatches = matches.filter((match) => {
    const matchDate = new Date(match.createdAt)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return matchDate > thirtyDaysAgo
  })

  if (recentMatches.length > 0) {
    const recentAverage = Math.round(
      recentMatches.reduce((sum, match) => sum + match.compatibility.overall, 0) / recentMatches.length,
    )
    insights.push(`Your recent matches (last 30 days) show an average compatibility of ${recentAverage}%.`)
  }

  return insights
}

export function searchMatches(query: string): SavedMatch[] {
  const matches = getMatches()
  const lowercaseQuery = query.toLowerCase()

  return matches.filter(
    (match) =>
      match.person1.name.toLowerCase().includes(lowercaseQuery) ||
      match.person2.name.toLowerCase().includes(lowercaseQuery) ||
      match.person1.sign.toLowerCase().includes(lowercaseQuery) ||
      match.person2.sign.toLowerCase().includes(lowercaseQuery) ||
      (match.notes && match.notes.toLowerCase().includes(lowercaseQuery)),
  )
}

export function filterMatchesByScore(minScore: number, maxScore = 100): SavedMatch[] {
  const matches = getMatches()
  return matches.filter((match) => match.compatibility.overall >= minScore && match.compatibility.overall <= maxScore)
}
