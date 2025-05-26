"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, TrendingUp, Heart, MessageCircle, Zap, Briefcase } from "lucide-react"
import Link from "next/link"
import { getMatches, type SavedMatch } from "@/lib/match-history"
import { CircularProgress } from "@/components/circular-progress"
import { zodiacSigns } from "@/lib/zodiac-data"

export default function ComparePage() {
  const [matches, setMatches] = useState<SavedMatch[]>([])
  const [selectedMatches, setSelectedMatches] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMatches = () => {
      try {
        const allMatches = getMatches()
        setMatches(allMatches)
      } catch (error) {
        console.error("Failed to load matches:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [])

  const handleMatchSelection = (matchId: string, checked: boolean) => {
    if (checked) {
      if (selectedMatches.length < 4) {
        setSelectedMatches([...selectedMatches, matchId])
      }
    } else {
      setSelectedMatches(selectedMatches.filter((id) => id !== matchId))
    }
  }

  const selectedMatchData = selectedMatches.map((id) => matches.find((match) => match.id === id)!).filter(Boolean)

  const categories = [
    { name: "Overall", key: "overall", icon: TrendingUp, color: "text-purple-400" },
    { name: "Love", key: "love", icon: Heart, color: "text-red-400" },
    { name: "Friendship", key: "friendship", icon: Users, color: "text-blue-400" },
    { name: "Communication", key: "communication", icon: MessageCircle, color: "text-green-400" },
    { name: "Emotional", key: "emotional", icon: Zap, color: "text-yellow-400" },
    { name: "Professional", key: "professional", icon: Briefcase, color: "text-purple-400" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading matches...</div>
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        <div className="absolute inset-0">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link href="/history">
              <Button variant="ghost" className="text-purple-200 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to History
              </Button>
            </Link>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20 max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Matches to Compare</h3>
              <p className="text-purple-200 mb-6">Create some compatibility matches to use the comparison feature</p>
              <Link href="/compatibility">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Create Your First Match
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/history">
            <Button variant="ghost" className="text-purple-200 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to History
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Compare Matches</h1>
          <div></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Match Selection */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
            <CardHeader>
              <CardTitle className="text-white">
                Select Matches to Compare (up to 4)
                <span className="text-purple-300 text-sm ml-2">({selectedMatches.length}/4 selected)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedMatches.includes(match.id)
                        ? "bg-purple-600/20 border-purple-400"
                        : "bg-white/5 border-purple-300/20 hover:bg-white/10"
                    }`}
                    onClick={() => handleMatchSelection(match.id, !selectedMatches.includes(match.id))}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedMatches.includes(match.id)}
                        disabled={!selectedMatches.includes(match.id) && selectedMatches.length >= 4}
                        className="border-purple-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-2xl">
                            {zodiacSigns.find((z) => z.id === match.person1.sign)?.symbol}
                          </span>
                          <span className="text-white text-sm">+</span>
                          <span className="text-2xl">
                            {zodiacSigns.find((z) => z.id === match.person2.sign)?.symbol}
                          </span>
                        </div>
                        <p className="text-white text-sm">
                          {match.person1.name || match.person1.sign} + {match.person2.name || match.person2.sign}
                        </p>
                        <p className="text-purple-200 text-xs">{match.compatibility.overall}% compatibility</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          {selectedMatchData.length > 0 && (
            <div className="space-y-6">
              {/* Overall Comparison */}
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white">Overall Compatibility Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {selectedMatchData.map((match, index) => (
                      <div key={match.id} className="text-center">
                        <div className="mb-4">
                          <CircularProgress value={match.compatibility.overall} size={100} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-2xl">
                              {zodiacSigns.find((z) => z.id === match.person1.sign)?.symbol}
                            </span>
                            <span className="text-white">+</span>
                            <span className="text-2xl">
                              {zodiacSigns.find((z) => z.id === match.person2.sign)?.symbol}
                            </span>
                          </div>
                          <p className="text-white text-sm">
                            {match.person1.name || match.person1.sign} + {match.person2.name || match.person2.sign}
                          </p>
                          <p className="text-purple-200 text-xs">{new Date(match.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category Comparison */}
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white">Detailed Category Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {categories.map((category) => (
                      <div key={category.key}>
                        <div className="flex items-center space-x-2 mb-3">
                          <category.icon className={`h-5 w-5 ${category.color}`} />
                          <h3 className="text-white font-semibold">{category.name}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {selectedMatchData.map((match) => {
                            const score = match.compatibility[
                              category.key as keyof typeof match.compatibility
                            ] as number
                            return (
                              <div key={match.id} className="bg-white/5 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-purple-200 text-sm">
                                    {match.person1.name || match.person1.sign} +{" "}
                                    {match.person2.name || match.person2.sign}
                                  </span>
                                  <span className="text-white font-bold">{score}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${score}%` }}
                                  ></div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Factors Comparison */}
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Astrological Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {selectedMatchData.map((match) => (
                      <div key={match.id} className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-3">
                          {match.person1.name || match.person1.sign} + {match.person2.name || match.person2.sign}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-purple-200">Elemental Harmony</span>
                            <span className="text-white">{match.compatibility.elementalHarmony}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-200">Modality Balance</span>
                            <span className="text-white">{match.compatibility.modalityBalance}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-200">Planetary Aspects</span>
                            <span className="text-white">{match.compatibility.planetaryAspects}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-200">House Compatibility</span>
                            <span className="text-white">{match.compatibility.houseCompatibility}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-200">Venus-Mars Synastry</span>
                            <span className="text-white">{match.compatibility.venusMarsSynastry}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Insights Comparison */}
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white">Comparative Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedMatchData.length > 1 && (
                      <>
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-purple-200 font-semibold mb-2">Highest Compatibility</h4>
                          <p className="text-white">
                            {(() => {
                              const highest = selectedMatchData.reduce((prev, current) =>
                                prev.compatibility.overall > current.compatibility.overall ? prev : current,
                              )
                              return `${highest.person1.name || highest.person1.sign} + ${highest.person2.name || highest.person2.sign} (${highest.compatibility.overall}%)`
                            })()}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-purple-200 font-semibold mb-2">Average Score Comparison</h4>
                          <p className="text-white">
                            Average compatibility across selected matches:{" "}
                            {Math.round(
                              selectedMatchData.reduce((sum, match) => sum + match.compatibility.overall, 0) /
                                selectedMatchData.length,
                            )}
                            %
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-purple-200 font-semibold mb-2">Element Analysis</h4>
                          <p className="text-white">
                            {(() => {
                              const elements = selectedMatchData.map((match) => {
                                const sign1 = zodiacSigns.find((z) => z.id === match.person1.sign)
                                const sign2 = zodiacSigns.find((z) => z.id === match.person2.sign)
                                return `${sign1?.element}-${sign2?.element}`
                              })
                              const uniqueElements = [...new Set(elements)]
                              return `Element combinations: ${uniqueElements.join(", ")}`
                            })()}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
