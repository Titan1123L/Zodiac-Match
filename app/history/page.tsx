"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Trash2,
  BarChart3,
  Users,
  Calendar,
  Star,
  TrendingUp,
  GitCompare,
} from "lucide-react"
import Link from "next/link"
import {
  getMatches,
  getMatchAnalytics,
  deleteMatch,
  updateMatch,
  clearMatches,
  searchMatches,
  filterMatchesByScore,
  type SavedMatch,
  type MatchAnalytics,
} from "@/lib/match-history"
import { zodiacSigns } from "@/lib/zodiac-data"
import { CircularProgress } from "@/components/circular-progress"

export default function HistoryPage() {
  const [matches, setMatches] = useState<SavedMatch[]>([])
  const [analytics, setAnalytics] = useState<MatchAnalytics | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [scoreFilter, setScoreFilter] = useState({ min: 0, max: 100 })
  const [selectedMatch, setSelectedMatch] = useState<SavedMatch | null>(null)
  const [editingNotes, setEditingNotes] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    try {
      const allMatches = getMatches()
      const analyticsData = getMatchAnalytics()
      setMatches(allMatches)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchMatches(query)
      setMatches(results)
    } else {
      setMatches(getMatches())
    }
  }

  const handleScoreFilter = () => {
    const filtered = filterMatchesByScore(scoreFilter.min, scoreFilter.max)
    setMatches(filtered)
  }

  const handleDeleteMatch = (id: string) => {
    if (deleteMatch(id)) {
      loadData()
    }
  }

  const handleUpdateNotes = (id: string) => {
    if (updateMatch(id, { notes: editingNotes })) {
      loadData()
      setSelectedMatch(null)
    }
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all matches? This cannot be undone.")) {
      clearMatches()
      loadData()
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-500/20 text-green-300 border-green-500/30"
    if (score >= 60) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    return "bg-red-500/20 text-red-300 border-red-500/30"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading history...</div>
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
          <Link href="/">
            <Button variant="ghost" className="text-purple-200 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Match History</h1>
          <div className="flex items-center space-x-2">
            <Link href="/analytics">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/compare">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900"
              >
                <GitCompare className="mr-2 h-4 w-4" />
                Compare
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-900/50 mb-8">
              <TabsTrigger value="matches" className="text-white data-[state=active]:bg-purple-600">
                All Matches ({matches.length})
              </TabsTrigger>
              <TabsTrigger value="statistics" className="text-white data-[state=active]:bg-purple-600">
                Quick Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="space-y-6">
              {matches.length > 0 ? (
                <>
                  {/* Search and Filter */}
                  <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                            <Input
                              placeholder="Search by name, sign, or notes..."
                              value={searchQuery}
                              onChange={(e) => handleSearch(e.target.value)}
                              className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder="Min %"
                            value={scoreFilter.min}
                            onChange={(e) => setScoreFilter({ ...scoreFilter, min: Number(e.target.value) })}
                            className="w-20 bg-white/10 border-purple-300/30 text-white"
                          />
                          <span className="text-purple-200">-</span>
                          <Input
                            type="number"
                            placeholder="Max %"
                            value={scoreFilter.max}
                            onChange={(e) => setScoreFilter({ ...scoreFilter, max: Number(e.target.value) })}
                            className="w-20 bg-white/10 border-purple-300/30 text-white"
                          />
                          <Button
                            onClick={handleScoreFilter}
                            variant="outline"
                            className="border-purple-300 text-purple-300"
                          >
                            <Filter className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          onClick={() => setMatches(getMatches())}
                          variant="outline"
                          className="border-purple-300 text-purple-300"
                        >
                          Reset
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Matches Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map((match) => (
                      <Card
                        key={match.id}
                        className="bg-white/10 backdrop-blur-sm border-purple-300/20 hover:bg-white/15 transition-all"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">
                                {zodiacSigns.find((z) => z.id === match.person1.sign)?.symbol}
                              </span>
                              <span className="text-purple-200">+</span>
                              <span className="text-2xl">
                                {zodiacSigns.find((z) => z.id === match.person2.sign)?.symbol}
                              </span>
                            </div>
                            <Badge className={getScoreBadgeColor(match.compatibility.overall)}>
                              {match.compatibility.overall}%
                            </Badge>
                          </div>
                          <CardTitle className="text-white text-lg">
                            {match.person1.name || match.person1.sign} + {match.person2.name || match.person2.sign}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <CircularProgress value={match.compatibility.overall} size={80} />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-200">Love</span>
                              <span className="text-white">{match.compatibility.love}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-200">Friendship</span>
                              <span className="text-white">{match.compatibility.friendship}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-200">Communication</span>
                              <span className="text-white">{match.compatibility.communication}%</span>
                            </div>
                          </div>

                          <div className="text-xs text-purple-300">
                            {new Date(match.createdAt).toLocaleDateString()}
                          </div>

                          {match.notes && (
                            <div className="bg-white/5 rounded p-2">
                              <p className="text-purple-100 text-sm">{match.notes}</p>
                            </div>
                          )}

                          <div className="flex justify-between pt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-purple-300 hover:text-white"
                                  onClick={() => {
                                    setSelectedMatch(match)
                                    setEditingNotes(match.notes || "")
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-800 border-purple-300/30 text-white max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center space-x-2">
                                    <span className="text-2xl">
                                      {zodiacSigns.find((z) => z.id === match.person1.sign)?.symbol}
                                    </span>
                                    <span>+</span>
                                    <span className="text-2xl">
                                      {zodiacSigns.find((z) => z.id === match.person2.sign)?.symbol}
                                    </span>
                                    <span className="ml-2">
                                      {match.person1.name || match.person1.sign} +{" "}
                                      {match.person2.name || match.person2.sign}
                                    </span>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="text-center">
                                    <CircularProgress value={match.compatibility.overall} size={120} />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-purple-200">Love</span>
                                        <span>{match.compatibility.love}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-purple-200">Friendship</span>
                                        <span>{match.compatibility.friendship}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-purple-200">Communication</span>
                                        <span>{match.compatibility.communication}%</span>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-purple-200">Emotional</span>
                                        <span>{match.compatibility.emotional}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-purple-200">Professional</span>
                                        <span>{match.compatibility.professional}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-purple-200">Elemental</span>
                                        <span>{match.compatibility.elementalHarmony}%</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-purple-200 text-sm">Personal Notes</label>
                                    <Textarea
                                      value={editingNotes}
                                      onChange={(e) => setEditingNotes(e.target.value)}
                                      placeholder="Add your thoughts about this match..."
                                      className="mt-1 bg-white/10 border-purple-300/30 text-white"
                                    />
                                    <Button
                                      onClick={() => handleUpdateNotes(match.id)}
                                      className="mt-2 bg-purple-600 hover:bg-purple-700"
                                      size="sm"
                                    >
                                      Save Notes
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => handleDeleteMatch(match.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Clear All Button */}
                  <div className="text-center pt-8">
                    <Button
                      onClick={handleClearAll}
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All Matches
                    </Button>
                  </div>
                </>
              ) : (
                <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                  <CardContent className="p-12 text-center">
                    <Users className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">No Matches Found</h3>
                    <p className="text-purple-200 mb-6">
                      {searchQuery
                        ? "No matches found for your search. Try different keywords."
                        : "Start creating compatibility matches to build your cosmic history"}
                    </p>
                    <Link href="/compatibility">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Create Your First Match
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              {analytics && analytics.totalMatches > 0 ? (
                <>
                  {/* Quick Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-200 text-sm">Total Matches</p>
                            <p className="text-3xl font-bold text-white">{analytics.totalMatches}</p>
                          </div>
                          <Users className="h-8 w-8 text-purple-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-200 text-sm">Average Score</p>
                            <p className="text-3xl font-bold text-white">{analytics.averageCompatibility}%</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-200 text-sm">Best Match</p>
                            <p className="text-3xl font-bold text-white">
                              {analytics.topCompatibilities[0]?.score || 0}%
                            </p>
                          </div>
                          <Star className="h-8 w-8 text-yellow-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-200 text-sm">This Month</p>
                            <p className="text-3xl font-bold text-white">
                              {analytics.monthlyTrends[analytics.monthlyTrends.length - 1]?.count || 0}
                            </p>
                          </div>
                          <Calendar className="h-8 w-8 text-blue-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Matches */}
                  <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                    <CardHeader>
                      <CardTitle className="text-white">Top Compatibility Matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analytics.topCompatibilities.slice(0, 5).map((match, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <span className="text-white">{match.pairing}</span>
                            </div>
                            <span className="text-2xl font-bold text-white">{match.score}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insights */}
                  <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                    <CardHeader>
                      <CardTitle className="text-white">Cosmic Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analytics.insights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-purple-100">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-4">
                    <Link href="/analytics">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Full Analytics
                      </Button>
                    </Link>
                    <Link href="/compare">
                      <Button
                        variant="outline"
                        className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900"
                      >
                        <GitCompare className="mr-2 h-4 w-4" />
                        Compare Matches
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                  <CardContent className="p-12 text-center">
                    <BarChart3 className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">No Statistics Available</h3>
                    <p className="text-purple-200 mb-6">Create some matches to see your compatibility statistics</p>
                    <Link href="/compatibility">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Create Your First Match
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
