"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { zodiacSigns, getHoroscope } from "@/lib/zodiac-data"

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState("")
  const [period, setPeriod] = useState("today")

  const horoscope = selectedSign ? getHoroscope(selectedSign, period) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-purple-200 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Daily Horoscope</h1>
            <p className="text-purple-200 text-lg">Discover what the stars have in store for you</p>
          </div>

          {/* Sign Selection */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-center">Select Your Sign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedSign} onValueChange={setSelectedSign}>
                <SelectTrigger className="bg-white/10 border-purple-300/30 text-white">
                  <SelectValue placeholder="Choose your zodiac sign" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-300/30">
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.id} value={sign.id} className="text-white hover:bg-purple-600">
                      {sign.symbol} {sign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Tabs value={period} onValueChange={setPeriod} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-purple-900/50">
                  <TabsTrigger value="today" className="text-white data-[state=active]:bg-purple-600">
                    Today
                  </TabsTrigger>
                  <TabsTrigger value="week" className="text-white data-[state=active]:bg-purple-600">
                    This Week
                  </TabsTrigger>
                  <TabsTrigger value="month" className="text-white data-[state=active]:bg-purple-600">
                    This Month
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Horoscope Display */}
          {horoscope && (
            <div className="space-y-6">
              {/* Main Horoscope */}
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <span className="text-4xl">{zodiacSigns.find((s) => s.id === selectedSign)?.symbol}</span>
                    <div>
                      <h2 className="text-2xl">{zodiacSigns.find((s) => s.id === selectedSign)?.name}</h2>
                      <p className="text-purple-200 text-sm capitalize">{period} Horoscope</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white text-lg leading-relaxed">{horoscope.general}</p>
                </CardContent>
              </Card>

              {/* Detailed Predictions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <span className="text-red-400">💕</span>
                      <span>Love & Relationships</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{horoscope.love}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <span className="text-green-400">💼</span>
                      <span>Career & Finance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{horoscope.career}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <span className="text-blue-400">🌟</span>
                      <span>Health & Wellness</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{horoscope.health}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <span className="text-yellow-400">🔮</span>
                      <span>Lucky Numbers & Colors</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-white">
                      <span className="text-purple-200">Lucky Numbers:</span> {horoscope.luckyNumbers.join(", ")}
                    </p>
                    <p className="text-white">
                      <span className="text-purple-200">Lucky Colors:</span> {horoscope.luckyColors.join(", ")}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* All Signs Overview */}
              <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
                <CardHeader>
                  <CardTitle className="text-white text-center">All Signs at a Glance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {zodiacSigns.map((sign) => (
                      <button
                        key={sign.id}
                        onClick={() => setSelectedSign(sign.id)}
                        className={`p-3 rounded-lg text-center transition-all ${
                          selectedSign === sign.id
                            ? "bg-purple-600 text-white"
                            : "bg-white/10 text-purple-200 hover:bg-white/20"
                        }`}
                      >
                        <div className="text-2xl mb-1">{sign.symbol}</div>
                        <div className="text-xs">{sign.name}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!selectedSign && (
            <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
              <CardContent className="p-12 text-center">
                <Star className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Select Your Sign</h3>
                <p className="text-purple-200">Choose your zodiac sign above to see your personalized horoscope</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
