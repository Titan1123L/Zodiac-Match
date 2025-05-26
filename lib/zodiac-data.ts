export interface ZodiacSign {
  id: string
  name: string
  symbol: string
  element: string
  quality: string
  dates: string
  traits: string[]
  rulingPlanet: string
  oppositeSign: string
  compatibleElements: string[]
}

export interface PlanetaryPosition {
  planet: string
  sign: string
  degree: number
  house: number
}

export interface AstrologicalProfile {
  sunSign: string
  moonSign: string
  risingSign: string
  planets: PlanetaryPosition[]
  houses: Record<number, string>
}

export interface AdvancedCompatibility {
  overall: number
  love: number
  friendship: number
  communication: number
  emotional: number
  professional: number
  description: string
  strengths: string[]
  challenges: string[]
  // Advanced factors
  elementalHarmony: number
  modalityBalance: number
  planetaryAspects: number
  houseCompatibility: number
  moonPhaseInfluence: number
  venusMarsSynastry: number
  // Detailed explanations
  elementalAnalysis: string
  planetaryAnalysis: string
  houseAnalysis: string
  aspectAnalysis: string
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

export const zodiacSigns: ZodiacSign[] = [
  {
    id: "aries",
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    quality: "Cardinal",
    dates: "Mar 21 - Apr 19",
    traits: ["Energetic", "Confident", "Impulsive", "Leadership"],
    rulingPlanet: "Mars",
    oppositeSign: "libra",
    compatibleElements: ["Fire", "Air"],
  },
  {
    id: "taurus",
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    quality: "Fixed",
    dates: "Apr 20 - May 20",
    traits: ["Reliable", "Patient", "Practical", "Stubborn"],
    rulingPlanet: "Venus",
    oppositeSign: "scorpio",
    compatibleElements: ["Earth", "Water"],
  },
  {
    id: "gemini",
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    quality: "Mutable",
    dates: "May 21 - Jun 20",
    traits: ["Adaptable", "Curious", "Social", "Indecisive"],
    rulingPlanet: "Mercury",
    oppositeSign: "sagittarius",
    compatibleElements: ["Air", "Fire"],
  },
  {
    id: "cancer",
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    quality: "Cardinal",
    dates: "Jun 21 - Jul 22",
    traits: ["Emotional", "Nurturing", "Intuitive", "Moody"],
    rulingPlanet: "Moon",
    oppositeSign: "capricorn",
    compatibleElements: ["Water", "Earth"],
  },
  {
    id: "leo",
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    quality: "Fixed",
    dates: "Jul 23 - Aug 22",
    traits: ["Confident", "Generous", "Creative", "Dramatic"],
    rulingPlanet: "Sun",
    oppositeSign: "aquarius",
    compatibleElements: ["Fire", "Air"],
  },
  {
    id: "virgo",
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    quality: "Mutable",
    dates: "Aug 23 - Sep 22",
    traits: ["Analytical", "Practical", "Perfectionist", "Helpful"],
    rulingPlanet: "Mercury",
    oppositeSign: "pisces",
    compatibleElements: ["Earth", "Water"],
  },
  {
    id: "libra",
    name: "Libra",
    symbol: "♎",
    element: "Air",
    quality: "Cardinal",
    dates: "Sep 23 - Oct 22",
    traits: ["Diplomatic", "Balanced", "Social", "Indecisive"],
    rulingPlanet: "Venus",
    oppositeSign: "aries",
    compatibleElements: ["Air", "Fire"],
  },
  {
    id: "scorpio",
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    quality: "Fixed",
    dates: "Oct 23 - Nov 21",
    traits: ["Intense", "Passionate", "Mysterious", "Jealous"],
    rulingPlanet: "Pluto",
    oppositeSign: "taurus",
    compatibleElements: ["Water", "Earth"],
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    quality: "Mutable",
    dates: "Nov 22 - Dec 21",
    traits: ["Adventurous", "Optimistic", "Philosophical", "Restless"],
    rulingPlanet: "Jupiter",
    oppositeSign: "gemini",
    compatibleElements: ["Fire", "Air"],
  },
  {
    id: "capricorn",
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    quality: "Cardinal",
    dates: "Dec 22 - Jan 19",
    traits: ["Ambitious", "Disciplined", "Practical", "Pessimistic"],
    rulingPlanet: "Saturn",
    oppositeSign: "cancer",
    compatibleElements: ["Earth", "Water"],
  },
  {
    id: "aquarius",
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    quality: "Fixed",
    dates: "Jan 20 - Feb 18",
    traits: ["Independent", "Innovative", "Humanitarian", "Detached"],
    rulingPlanet: "Uranus",
    oppositeSign: "leo",
    compatibleElements: ["Air", "Fire"],
  },
  {
    id: "pisces",
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    quality: "Mutable",
    dates: "Feb 19 - Mar 20",
    traits: ["Intuitive", "Compassionate", "Artistic", "Escapist"],
    rulingPlanet: "Neptune",
    oppositeSign: "virgo",
    compatibleElements: ["Water", "Earth"],
  },
]

// Advanced compatibility calculations
export function calculateAdvancedCompatibility(
  sign1: string,
  sign2: string,
  profile1?: Partial<AstrologicalProfile>,
  profile2?: Partial<AstrologicalProfile>,
): AdvancedCompatibility {
  const zodiac1 = zodiacSigns.find((z) => z.id === sign1)!
  const zodiac2 = zodiacSigns.find((z) => z.id === sign2)!

  // Base compatibility from sun signs
  const baseCompatibility = calculateBaseCompatibility(zodiac1, zodiac2)

  // Advanced factors
  const elementalHarmony = calculateElementalHarmony(zodiac1, zodiac2)
  const modalityBalance = calculateModalityBalance(zodiac1, zodiac2)
  const planetaryAspects = calculatePlanetaryAspects(zodiac1, zodiac2, profile1, profile2)
  const houseCompatibility = calculateHouseCompatibility(profile1, profile2)
  const moonPhaseInfluence = calculateMoonPhaseInfluence(profile1, profile2)
  const venusMarsSynastry = calculateVenusMarsSynastry(profile1, profile2)

  // Weighted overall score
  const overall = Math.round(
    baseCompatibility.overall * 0.3 +
      elementalHarmony * 0.15 +
      modalityBalance * 0.1 +
      planetaryAspects * 0.2 +
      houseCompatibility * 0.15 +
      moonPhaseInfluence * 0.05 +
      venusMarsSynastry * 0.05,
  )

  return {
    ...baseCompatibility,
    overall,
    elementalHarmony,
    modalityBalance,
    planetaryAspects,
    houseCompatibility,
    moonPhaseInfluence,
    venusMarsSynastry,
    elementalAnalysis: generateElementalAnalysis(zodiac1, zodiac2),
    planetaryAnalysis: generatePlanetaryAnalysis(zodiac1, zodiac2),
    houseAnalysis: generateHouseAnalysis(profile1, profile2),
    aspectAnalysis: generateAspectAnalysis(zodiac1, zodiac2),
  }
}

function calculateBaseCompatibility(zodiac1: ZodiacSign, zodiac2: ZodiacSign) {
  let baseScore = 50

  // Element compatibility
  if (zodiac1.element === zodiac2.element) baseScore += 20
  else if (zodiac1.compatibleElements.includes(zodiac2.element)) baseScore += 15
  else if (zodiac1.oppositeSign === zodiac2.id) baseScore += 10

  // Quality compatibility
  if (zodiac1.quality === zodiac2.quality) baseScore += 10
  else if (
    (zodiac1.quality === "Cardinal" && zodiac2.quality === "Mutable") ||
    (zodiac1.quality === "Mutable" && zodiac2.quality === "Cardinal")
  )
    baseScore += 5

  // Ruling planet harmony
  const planetaryHarmony = calculatePlanetaryHarmony(zodiac1.rulingPlanet, zodiac2.rulingPlanet)
  baseScore += planetaryHarmony

  return {
    overall: Math.min(100, Math.max(0, baseScore)),
    love: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10)),
    friendship: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10)),
    communication: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10)),
    emotional: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10)),
    professional: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20) - 10)),
    description: generateCompatibilityDescription(zodiac1, zodiac2),
    strengths: generateStrengths(zodiac1, zodiac2),
    challenges: generateChallenges(zodiac1, zodiac2),
  }
}

function calculateElementalHarmony(zodiac1: ZodiacSign, zodiac2: ZodiacSign): number {
  const elementScores: Record<string, Record<string, number>> = {
    Fire: { Fire: 85, Air: 80, Earth: 60, Water: 55 },
    Earth: { Earth: 85, Water: 80, Fire: 60, Air: 55 },
    Air: { Air: 85, Fire: 80, Water: 60, Earth: 55 },
    Water: { Water: 85, Earth: 80, Air: 60, Fire: 55 },
  }
  return elementScores[zodiac1.element][zodiac2.element]
}

function calculateModalityBalance(zodiac1: ZodiacSign, zodiac2: ZodiacSign): number {
  if (zodiac1.quality === zodiac2.quality) return 75
  if (
    (zodiac1.quality === "Cardinal" && zodiac2.quality === "Fixed") ||
    (zodiac1.quality === "Fixed" && zodiac2.quality === "Cardinal")
  )
    return 85
  return 80 // Cardinal-Mutable or Fixed-Mutable
}

function calculatePlanetaryAspects(
  zodiac1: ZodiacSign,
  zodiac2: ZodiacSign,
  profile1?: Partial<AstrologicalProfile>,
  profile2?: Partial<AstrologicalProfile>,
): number {
  // Simplified planetary aspect calculation
  const harmonious = ["Venus", "Jupiter", "Sun", "Moon"]
  const challenging = ["Mars", "Saturn", "Pluto"]

  let score = 70

  if (harmonious.includes(zodiac1.rulingPlanet) && harmonious.includes(zodiac2.rulingPlanet)) {
    score += 15
  } else if (challenging.includes(zodiac1.rulingPlanet) && challenging.includes(zodiac2.rulingPlanet)) {
    score -= 10
  }

  return Math.min(100, Math.max(0, score))
}

function calculateHouseCompatibility(
  profile1?: Partial<AstrologicalProfile>,
  profile2?: Partial<AstrologicalProfile>,
): number {
  // Simplified house compatibility - would need birth time for accurate calculation
  return 70 + Math.floor(Math.random() * 20)
}

function calculateMoonPhaseInfluence(
  profile1?: Partial<AstrologicalProfile>,
  profile2?: Partial<AstrologicalProfile>,
): number {
  // Simplified moon phase influence
  return 65 + Math.floor(Math.random() * 25)
}

function calculateVenusMarsSynastry(
  profile1?: Partial<AstrologicalProfile>,
  profile2?: Partial<AstrologicalProfile>,
): number {
  // Simplified Venus-Mars synastry for romantic compatibility
  return 70 + Math.floor(Math.random() * 25)
}

function calculatePlanetaryHarmony(planet1: string, planet2: string): number {
  const harmonies: Record<string, string[]> = {
    Sun: ["Moon", "Venus", "Jupiter"],
    Moon: ["Sun", "Venus", "Neptune"],
    Mercury: ["Venus", "Jupiter", "Uranus"],
    Venus: ["Sun", "Moon", "Mercury", "Jupiter"],
    Mars: ["Sun", "Jupiter", "Pluto"],
    Jupiter: ["Sun", "Moon", "Mercury", "Venus", "Mars"],
    Saturn: ["Venus", "Neptune"],
    Uranus: ["Mercury", "Aquarius"],
    Neptune: ["Moon", "Saturn", "Pisces"],
    Pluto: ["Mars", "Scorpio"],
  }

  if (planet1 === planet2) return 15
  if (harmonies[planet1]?.includes(planet2)) return 10
  return 5
}

function generateCompatibilityDescription(zodiac1: ZodiacSign, zodiac2: ZodiacSign): string {
  const descriptions: Record<string, Record<string, string>> = {
    aries: {
      aries:
        "Two Aries create an explosive combination of energy and passion. This relationship thrives on adventure, competition, and mutual respect for independence.",
      leo: "Aries and Leo form a powerhouse duo with natural chemistry. Both fire signs share confidence, ambition, and a love for excitement.",
      sagittarius:
        "This fire sign pairing creates an adventurous and optimistic partnership filled with exploration and philosophical discussions.",
    },
    // Add more specific combinations...
  }

  return (
    descriptions[zodiac1.id]?.[zodiac2.id] ||
    `${zodiac1.name} and ${zodiac2.name} create a unique dynamic with their ${zodiac1.element} and ${zodiac2.element} energies combining in interesting ways.`
  )
}

function generateStrengths(zodiac1: ZodiacSign, zodiac2: ZodiacSign): string[] {
  const strengths = []

  if (zodiac1.element === zodiac2.element) {
    strengths.push("Natural understanding of each other's core nature")
  }

  if (zodiac1.compatibleElements.includes(zodiac2.element)) {
    strengths.push("Complementary elemental energies")
  }

  strengths.push("Shared appreciation for growth and learning")
  strengths.push("Potential for deep emotional connection")

  return strengths
}

function generateChallenges(zodiac1: ZodiacSign, zodiac2: ZodiacSign): string[] {
  const challenges = []

  if (zodiac1.quality === zodiac2.quality && zodiac1.quality === "Fixed") {
    challenges.push("Both signs can be stubborn and resistant to change")
  }

  if (!zodiac1.compatibleElements.includes(zodiac2.element)) {
    challenges.push("Different elemental approaches may require patience")
  }

  challenges.push("Need for open communication about differences")
  challenges.push("Balancing individual needs with relationship harmony")

  return challenges
}

function generateElementalAnalysis(zodiac1: ZodiacSign, zodiac2: ZodiacSign): string {
  return `The ${zodiac1.element} energy of ${zodiac1.name} ${zodiac1.compatibleElements.includes(zodiac2.element) ? "harmonizes well" : "creates interesting tension"} with the ${zodiac2.element} nature of ${zodiac2.name}. This combination brings ${zodiac1.element === zodiac2.element ? "mutual understanding" : "complementary perspectives"} to the relationship.`
}

function generatePlanetaryAnalysis(zodiac1: ZodiacSign, zodiac2: ZodiacSign): string {
  return `${zodiac1.name} is ruled by ${zodiac1.rulingPlanet}, while ${zodiac2.name} is governed by ${zodiac2.rulingPlanet}. This planetary combination influences how you both approach life, with ${zodiac1.rulingPlanet} bringing its unique energy to complement ${zodiac2.rulingPlanet}'s influence.`
}

function generateHouseAnalysis(
  profile1?: Partial<AstrologicalProfile>,
  profile2?: Partial<AstrologicalProfile>,
): string {
  return "House analysis requires precise birth times to determine how your life areas (career, relationships, home) align. This deeper analysis reveals where you'll find the most harmony and where you might need to work together."
}

function generateAspectAnalysis(zodiac1: ZodiacSign, zodiac2: ZodiacSign): string {
  return `The angular relationship between your signs creates specific energetic patterns. ${zodiac1.name} and ${zodiac2.name} form aspects that influence how your energies blend, creating opportunities for growth and areas requiring conscious attention.`
}

// Keep existing functions for backward compatibility
export function getCompatibility(sign1: string, sign2: string) {
  return calculateAdvancedCompatibility(sign1, sign2)
}

export interface Horoscope {
  general: string
  love: string
  career: string
  health: string
  luckyNumbers: number[]
  luckyColors: string[]
}

export function getHoroscope(sign: string, period: string): Horoscope {
  const horoscopes = {
    today: {
      general:
        "Today brings new opportunities for growth and self-discovery. The stars align to support your natural talents and encourage you to step out of your comfort zone.",
      love: "Romance is in the air today. Single? Keep your eyes open for unexpected connections. Partnered? It's a perfect day for intimate conversations.",
      career:
        "Your professional life takes center stage today. A project you've been working on may finally get the recognition it deserves.",
      health:
        "Pay attention to your body's signals today. A balanced approach to diet and exercise will serve you well.",
    },
    week: {
      general:
        "This week promises significant developments in your personal and professional life. Trust your instincts and don't be afraid to take calculated risks.",
      love: "The middle of the week brings clarity to relationship matters. Important conversations may lead to deeper understanding.",
      career:
        "Professional opportunities multiply this week. Your leadership skills will be particularly valuable around Wednesday.",
      health: "Focus on stress management this week. Meditation or yoga could provide the balance you need.",
    },
    month: {
      general:
        "This month marks a period of transformation and renewal. Old patterns give way to new possibilities as you embrace change.",
      love: "Relationships undergo positive changes this month. Whether single or partnered, expect meaningful developments.",
      career: "Career advancement is highlighted this month. Your hard work begins to pay off in tangible ways.",
      health: "A holistic approach to health serves you well this month. Consider both physical and mental wellness.",
    },
  }

  const selectedHoroscope = horoscopes[period as keyof typeof horoscopes] || horoscopes.today

  return {
    ...selectedHoroscope,
    luckyNumbers: [
      Math.floor(Math.random() * 50) + 1,
      Math.floor(Math.random() * 50) + 1,
      Math.floor(Math.random() * 50) + 1,
    ],
    luckyColors: ["Purple", "Gold", "Silver"].sort(() => Math.random() - 0.5).slice(0, 2),
  }
}
