"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodiacSigns } from "@/lib/zodiac-data"

export default function CompatibilityPage() {
  const router = useRouter()
  const [person1, setPerson1] = useState({ sign: "", name: "", birthDate: "" })
  const [person2, setPerson2] = useState({ sign: "", name: "", birthDate: "" })
  const [inputMethod, setInputMethod] = useState("sign")

  const handleSubmit = () => {
    if (person1.sign && person2.sign) {
      router.push(`/results?sign1=${person1.sign}&sign2=${person2.sign}&name1=${person1.name}&name2=${person2.name}`)
    }
  }

  const getSignFromDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()

    // Simple zodiac sign calculation based on date ranges
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries"
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus"
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini"
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer"
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo"
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra"
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio"
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius"
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn"
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius"
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "pisces"
    return ""
  }

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

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">Find Your Cosmic Match</CardTitle>
              <p className="text-purple-200">Enter information for both people to discover their compatibility</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={inputMethod} onValueChange={setInputMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-purple-900/50">
                  <TabsTrigger value="sign" className="text-white data-[state=active]:bg-purple-600">
                    Select Signs
                  </TabsTrigger>
                  <TabsTrigger value="date" className="text-white data-[state=active]:bg-purple-600">
                    Birth Dates
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sign" className="space-y-6 mt-6">
                  {/* Person 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-300" />
                      <Label className="text-white font-semibold">Person 1</Label>
                    </div>
                    <Input
                      placeholder="Name (optional)"
                      value={person1.name}
                      onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                      className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    />
                    <Select value={person1.sign} onValueChange={(value) => setPerson1({ ...person1, sign: value })}>
                      <SelectTrigger className="bg-white/10 border-purple-300/30 text-white">
                        <SelectValue placeholder="Select zodiac sign" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-purple-300/30">
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign.id} value={sign.id} className="text-white hover:bg-purple-600">
                            {sign.symbol} {sign.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Person 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-300" />
                      <Label className="text-white font-semibold">Person 2</Label>
                    </div>
                    <Input
                      placeholder="Name (optional)"
                      value={person2.name}
                      onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                      className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    />
                    <Select value={person2.sign} onValueChange={(value) => setPerson2({ ...person2, sign: value })}>
                      <SelectTrigger className="bg-white/10 border-purple-300/30 text-white">
                        <SelectValue placeholder="Select zodiac sign" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-purple-300/30">
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign.id} value={sign.id} className="text-white hover:bg-purple-600">
                            {sign.symbol} {sign.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="date" className="space-y-6 mt-6">
                  {/* Person 1 Birth Date */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-300" />
                      <Label className="text-white font-semibold">Person 1</Label>
                    </div>
                    <Input
                      placeholder="Name (optional)"
                      value={person1.name}
                      onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                      className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    />
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-300" />
                      <Input
                        type="date"
                        value={person1.birthDate}
                        onChange={(e) => {
                          setPerson1({
                            ...person1,
                            birthDate: e.target.value,
                            sign: getSignFromDate(e.target.value),
                          })
                        }}
                        className="bg-white/10 border-purple-300/30 text-white"
                      />
                    </div>
                    {person1.sign && (
                      <p className="text-purple-200 text-sm">
                        Detected sign: {zodiacSigns.find((s) => s.id === person1.sign)?.symbol}{" "}
                        {zodiacSigns.find((s) => s.id === person1.sign)?.name}
                      </p>
                    )}
                  </div>

                  {/* Person 2 Birth Date */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-300" />
                      <Label className="text-white font-semibold">Person 2</Label>
                    </div>
                    <Input
                      placeholder="Name (optional)"
                      value={person2.name}
                      onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                      className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                    />
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-300" />
                      <Input
                        type="date"
                        value={person2.birthDate}
                        onChange={(e) => {
                          setPerson2({
                            ...person2,
                            birthDate: e.target.value,
                            sign: getSignFromDate(e.target.value),
                          })
                        }}
                        className="bg-white/10 border-purple-300/30 text-white"
                      />
                    </div>
                    {person2.sign && (
                      <p className="text-purple-200 text-sm">
                        Detected sign: {zodiacSigns.find((s) => s.id === person2.sign)?.symbol}{" "}
                        {zodiacSigns.find((s) => s.id === person2.sign)?.name}
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                onClick={handleSubmit}
                disabled={!person1.sign || !person2.sign}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold rounded-full disabled:opacity-50"
              >
                Check Compatibility ✨
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
