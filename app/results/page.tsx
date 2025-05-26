"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Users, MessageCircle, Zap, Briefcase, Save, Check } from "lucide-react"
import Link from "next/link"
import { zodiacSigns, calculateAdvancedCompatibility, type AdvancedCompatibility } from "@/lib/zodiac-data"
import { saveMatch } from "@/lib/match-history"
import { CircularProgress } from "@/components/circular-progress"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const sign1 = searchParams.get("sign1") || ""
  const sign2 = searchParams.get("sign2") || ""
  const name1 = searchParams.get("name1") || "Person 1"
  const name2 = searchParams.get("name2") || "Person 2"

  const [compatibility, setCompatibility] = useState<AdvancedCompatibility | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  const zodiac1 = zodiacSigns.find((z) => z.id === sign1)
  const zodiac2 = zodiacSigns.find((z) => z.id === sign2)

  useEffect(() => {
    if (zodiac1 && zodiac2) {
      const comp = calculateAdvancedCompatibility(sign1, sign2)
      setCompatibility(comp)
      setLoading(false)
    }
  }, [sign1, sign2, zodiac1, zodiac2])

  const handleSaveMatch = () => {
    if (compatibility && zodiac1 && zodiac2) {
      saveMatch({
        person1: { name: name1, sign: sign1 },
        person2: { name: name2, sign: sign2 },
        compatibility,
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }
  }

  if (loading || !zodiac1 || !zodiac2 || !compatibility) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
          <CardContent className="p-8 text-center">
            <p className="text-white text-xl">
              {loading ? "Calculating cosmic compatibility..." : "Invalid compatibility data"}
            </p>
            {!loading && (
              <Link href="/compatibility">
                <Button className="mt-4">Try Again</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const categories = [
    { name: "Love", icon: Heart, score: compatibility.love, color: "text-red-400" },
    { name: "Friendship", icon: Users, score: compatibility.friendship, color: "text-blue-400" },
    { name: "Communication", icon: MessageCircle, score: compatibility.communication, color: "text-green-400" },
    { name: "Emotional", icon: Zap, score: compatibility.emotional, color: "text-yellow-400" },
    { name: "Professional", icon: Briefcase, score: compatibility.professional, color: "text-purple-400" },
  ]

  const advancedFactors = [
    {
      name: "Elemental Harmony",
      score: compatibility.elementalHarmony,
      description: "How well your core energies blend",
    },
    {
      name: "Modality Balance",
      score: compatibility.modalityBalance,
      description: "Your approaches to change and action",
    },
    {
      name: "Planetary Aspects",
      score: compatibility.planetaryAspects,
      description: "Cosmic influences on your connection",
    },
    { name: "House Compatibility", score: compatibility.houseCompatibility, description: "Life area alignments" },
    {
      name: "Venus-Mars Synastry",
      score: compatibility.venusMarsSynastry,
      description: "Romantic and passionate chemistry",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/compatibility">
            <Button variant="ghost" className="text-purple-200 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Match
            </Button>
          </Link>
          <Button
            onClick={handleSaveMatch}
            className={`transition-all duration-300 ${
              isSaved
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            }`}
          >
            {isSaved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaved ? "Saved!" : "Save Match"}
          </Button>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header with signs */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-6xl mb-2">{zodiac1.symbol}</div>
                  <h2 className="text-2xl font-bold text-white">{zodiac1.name}</h2>
                  <p className="text-purple-200">{name1}</p>
                  <div className="mt-2 space-y-1">
                    <Badge variant="outline" className="border-purple-300 text-purple-200">
                      {zodiac1.element}
                    </Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-200 ml-2">
                      {zodiac1.quality}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-300 mt-1">{zodiac1.dates}</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl text-pink-300 mb-4">💫</div>
                  <div className="text-center">
                    <CircularProgress value={compatibility.overall} size={140} />
                    <p className="text-white font-semibold mt-2">Overall Compatibility</p>
                    <p className="text-purple-200 text-sm">Advanced Calculation</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-6xl mb-2">{zodiac2.symbol}</div>
                  <h2 className="text-2xl font-bold text-white">{zodiac2.name}</h2>
                  <p className="text-purple-200">{name2}</p>
                  <div className="mt-2 space-y-1">
                    <Badge variant="outline" className="border-purple-300 text-purple-200">
                      {zodiac2.element}
                    </Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-200 ml-2">
                      {zodiac2.quality}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-300 mt-1">{zodiac2.dates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core Compatibility Categories */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
            <CardHeader>
              <CardTitle className="text-white text-xl">Core Compatibility Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.name} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                      <span className="text-white font-semibold">{category.name}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Score</span>
                        <span className="text-white font-bold text-lg">{category.score}%</span>
                      </div>
                      <Progress value={category.score} className="h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Astrological Factors */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
            <CardHeader>
              <CardTitle className="text-white text-xl">Advanced Astrological Analysis</CardTitle>
              <p className="text-purple-200">Deep cosmic factors influencing your compatibility</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {advancedFactors.map((factor) => (
                  <div key={factor.name} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{factor.name}</h4>
                      <span className="text-white font-bold">{factor.score}%</span>
                    </div>
                    <p className="text-purple-200 text-sm mb-3">{factor.description}</p>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Astrological Insights */}
            <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
              <CardHeader>
                <CardTitle className="text-white text-xl">Astrological Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">Elemental Analysis</h3>
                  <p className="text-white leading-relaxed text-sm">{compatibility.elementalAnalysis}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">Planetary Influences</h3>
                  <p className="text-white leading-relaxed text-sm">{compatibility.planetaryAnalysis}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">Aspect Patterns</h3>
                  <p className="text-white leading-relaxed text-sm">{compatibility.aspectAnalysis}</p>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility Overview */}
            <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
              <CardHeader>
                <CardTitle className="text-white text-xl">Compatibility Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">Relationship Dynamics</h3>
                  <p className="text-white leading-relaxed text-sm">{compatibility.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-purple-200 font-semibold mb-2">Cosmic Strengths</h4>
                    <ul className="space-y-1">
                      {compatibility.strengths.map((strength, index) => (
                        <li key={index} className="text-white flex items-start text-sm">
                          <span className="text-green-400 mr-2 mt-1">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-purple-200 font-semibold mb-2">Growth Areas</h4>
                    <ul className="space-y-1">
                      {compatibility.challenges.map((challenge, index) => (
                        <li key={index} className="text-white flex items-start text-sm">
                          <span className="text-yellow-400 mr-2 mt-1">⚠</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compatibility">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full">
                Try Another Match
              </Button>
            </Link>
            <Link href="/history">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900 px-8 py-3 rounded-full"
              >
                View Match History
              </Button>
            </Link>
            <Link href="/horoscope">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900 px-8 py-3 rounded-full"
              >
                Daily Horoscope
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
