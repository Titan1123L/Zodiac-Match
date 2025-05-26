import { Button } from "@/components/ui/button"
import { Stars, Sparkles, Moon } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Moon className="h-8 w-8 text-purple-300" />
          <span className="text-2xl font-bold text-white">ZodiacMatch</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/horoscope" className="text-purple-200 hover:text-white transition-colors">
            Horoscope
          </Link>
          <Link href="/auth" className="text-purple-200 hover:text-white transition-colors">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-12 w-12 text-yellow-300 mr-4 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-white bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Discover Your Zodiac Compatibility
            </h1>
            <Sparkles className="h-12 w-12 text-yellow-300 ml-4 animate-pulse" />
          </div>

          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Find out how compatible you are with your partner, friend, or colleague based on astrology. Unlock the
            secrets of the stars and discover your cosmic connections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/compatibility">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Stars className="mr-2 h-5 w-5" />
                Start Matching
              </Button>
            </Link>
            <Link href="/horoscope">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Daily Horoscope
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating zodiac symbols */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl text-purple-300 opacity-30 animate-bounce">♈</div>
          <div className="absolute top-40 right-20 text-4xl text-pink-300 opacity-30 animate-pulse">♌</div>
          <div className="absolute bottom-40 left-20 text-4xl text-blue-300 opacity-30 animate-bounce">♓</div>
          <div className="absolute bottom-20 right-10 text-4xl text-yellow-300 opacity-30 animate-pulse">♊</div>
        </div>
      </main>

      {/* Features Preview */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Explore Cosmic Connections</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-300/20">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-semibold text-white mb-2">Love Compatibility</h3>
              <p className="text-purple-200">Discover romantic potential between zodiac signs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-300/20">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-2">Friendship Match</h3>
              <p className="text-purple-200">Find your perfect cosmic companion</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-300/20">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional Synergy</h3>
              <p className="text-purple-200">Explore workplace compatibility</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
