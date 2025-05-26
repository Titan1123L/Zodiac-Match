"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Lock, User, Chrome } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = () => {
    setIsLoading(true)
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false)
      alert("Google OAuth integration would be implemented here")
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Authentication would be handled here")
    }, 1000)
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

        <div className="max-w-md mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-purple-300/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">Join ZodiacMatch</CardTitle>
              <p className="text-purple-200">Save your matches and get personalized insights</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-purple-900/50 mb-6">
                  <TabsTrigger value="signin" className="text-white data-[state=active]:bg-purple-600">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-white data-[state=active]:bg-purple-600">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-10 bg-white/10 border-purple-300/30 text-white placeholder:text-purple-300"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-purple-300/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-purple-200">Or continue with</span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleAuth}
                  variant="outline"
                  className="w-full mt-4 border-purple-300/30 text-white hover:bg-white/10"
                  disabled={isLoading}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  {isLoading ? "Connecting..." : "Continue with Google"}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-purple-200">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-white">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-white">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 space-y-4">
            <h3 className="text-white text-center font-semibold">Why Join ZodiacMatch?</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-purple-200">
                <span className="text-green-400">✓</span>
                <span>Save your compatibility matches</span>
              </div>
              <div className="flex items-center space-x-3 text-purple-200">
                <span className="text-green-400">✓</span>
                <span>Get personalized daily horoscopes</span>
              </div>
              <div className="flex items-center space-x-3 text-purple-200">
                <span className="text-green-400">✓</span>
                <span>Track relationship insights over time</span>
              </div>
              <div className="flex items-center space-x-3 text-purple-200">
                <span className="text-green-400">✓</span>
                <span>Access premium compatibility features</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
