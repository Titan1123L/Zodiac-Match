"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, Users, BarChart3, PieChart, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { getMatchAnalytics, type MatchAnalytics } from "@/lib/match-history"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line,
  Pie,
} from "recharts"

const COLORS = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#EF4444", "#6366F1"]

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<MatchAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = () => {
      try {
        const data = getMatchAnalytics()
        setAnalytics(data)
      } catch (error) {
        console.error("Failed to load analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    )
  }

  if (!analytics || analytics.totalMatches === 0) {
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
              <BarChart3 className="h-16 w-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Data Available</h3>
              <p className="text-purple-200 mb-6">Create some compatibility matches to see your analytics dashboard</p>
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

  const scoreDistributionData = Object.entries(analytics.scoreDistribution).map(([range, count]) => ({
    range: range.replace(/$$.*$$/, ""),
    count,
    percentage: Math.round((count / analytics.totalMatches) * 100),
  }))

  const signPairingsData = Object.entries(analytics.signPairings)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([pairing, count]) => ({ pairing, count }))

  const elementCombinationsData = Object.entries(analytics.elementCombinations).map(([combo, count]) => ({
    name: combo,
    value: count,
    percentage: Math.round((count / analytics.totalMatches) * 100),
  }))

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
          <h1 className="text-3xl font-bold text-white">Match Analytics</h1>
          <div></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Overview Cards */}
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
                    <p className="text-3xl font-bold text-white">{analytics.topCompatibilities[0]?.score || 0}%</p>
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

          {/* Charts */}
          <Tabs defaultValue="distribution" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-purple-900/50">
              <TabsTrigger value="distribution" className="text-white data-[state=active]:bg-purple-600">
                Score Distribution
              </TabsTrigger>
              <TabsTrigger value="pairings" className="text-white data-[state=active]:bg-purple-600">
                Sign Pairings
              </TabsTrigger>
              <TabsTrigger value="elements" className="text-white data-[state=active]:bg-purple-600">
                Elements
              </TabsTrigger>
              <TabsTrigger value="trends" className="text-white data-[state=active]:bg-purple-600">
                Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="distribution" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Compatibility Score Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={scoreDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="range" stroke="#E5E7EB" />
                      <YAxis stroke="#E5E7EB" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(139, 92, 246, 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pairings" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Most Common Sign Pairings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={signPairingsData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" stroke="#E5E7EB" />
                      <YAxis dataKey="pairing" type="category" stroke="#E5E7EB" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(139, 92, 246, 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="#EC4899" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="elements" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Element Combinations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={elementCombinationsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {elementCombinationsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(139, 92, 246, 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Monthly Compatibility Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#E5E7EB" />
                      <YAxis stroke="#E5E7EB" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(139, 92, 246, 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="averageScore"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Top Matches */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Top Compatibility Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topCompatibilities.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white">{match.pairing}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">{match.score}%</span>
                    </div>
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
        </div>
      </div>
    </div>
  )
}
