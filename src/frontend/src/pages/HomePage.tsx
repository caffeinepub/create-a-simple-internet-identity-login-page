import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Home, User, MapPin, MessageSquare, Calculator, Heart, Activity, MessageCircle, Fish } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'profile' | 'map' | 'comment' | 'calculate' | 'fishing-zone') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden coral-reef-home-bg">
      {/* Baby blue ambient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-baby-blue-accent/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-baby-blue-bright/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="relative border-b border-baby-blue-border/30 bg-baby-blue-surface/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Right: Navigation */}
            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('profile')}
                className="text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('map')}
                className="text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Google Map
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('comment')}
                className="text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Comment
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('calculate')}
                className="text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('fishing-zone')}
                className="text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
              >
                <Fish className="h-4 w-4 mr-2" />
                Fishing Zone
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 py-16 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-baby-blue-bright via-baby-blue-accent to-baby-blue-text bg-clip-text text-transparent leading-tight drop-shadow-lg">
              Discover the hidden impacts of changing seas and oceans
            </h1>
            <div className="pt-4">
              <p className="text-2xl font-semibold text-baby-blue-accent">
                Get Started
              </p>
            </div>
          </div>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {/* Box 1: Interactive Map */}
            <Card className="bg-baby-blue-card/80 backdrop-blur-sm border-baby-blue-border/40 hover:border-baby-blue-accent/60 transition-all duration-300 hover:shadow-xl hover:shadow-baby-blue-accent/20">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-baby-blue-accent/20">
                    <MapPin className="h-8 w-8 text-baby-blue-accent" />
                  </div>
                </div>
                <CardTitle className="text-xl text-baby-blue-text">Interactive Map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-baby-blue-text/80 leading-relaxed">
                  Search ocean locations and view real time environmental readings including PH, turbidity and oxygen level
                </CardDescription>
                <Button 
                  onClick={() => onNavigate('map')}
                  className="w-full bg-baby-blue-accent hover:bg-baby-blue-bright text-white"
                >
                  Explore Map
                </Button>
              </CardContent>
            </Card>

            {/* Box 2: Coral Reef Health Index */}
            <Card className="bg-baby-blue-card/80 backdrop-blur-sm border-baby-blue-border/40 hover:border-baby-blue-accent/60 transition-all duration-300 hover:shadow-xl hover:shadow-baby-blue-accent/20">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-coral/20">
                    <Activity className="h-8 w-8 text-coral" />
                  </div>
                </div>
                <CardTitle className="text-xl text-baby-blue-text">Coral Reef Health Index</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-baby-blue-text/80 leading-relaxed">
                  calculate the health status of coral reefs based on water temperature and PH value. Get detailed Impacts and recommendations.
                </CardDescription>
                <Button 
                  onClick={() => onNavigate('calculate')}
                  className="w-full bg-coral hover:bg-coral/90 text-white"
                >
                  Calculate index
                </Button>
              </CardContent>
            </Card>

            {/* Box 3: Comment */}
            <Card className="bg-baby-blue-card/80 backdrop-blur-sm border-baby-blue-border/40 hover:border-baby-blue-accent/60 transition-all duration-300 hover:shadow-xl hover:shadow-baby-blue-accent/20">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-baby-blue-bright/20">
                    <MessageCircle className="h-8 w-8 text-baby-blue-bright" />
                  </div>
                </div>
                <CardTitle className="text-xl text-baby-blue-text">Comment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-baby-blue-text/80 leading-relaxed">
                  Share your observations and thoughts about ocean conditions. Join the conversation with the community.
                </CardDescription>
                <Button 
                  onClick={() => onNavigate('comment')}
                  className="w-full bg-baby-blue-bright hover:bg-baby-blue-accent text-white"
                >
                  Add Comment
                </Button>
              </CardContent>
            </Card>

            {/* Box 4: Fishing Zone */}
            <Card className="bg-baby-blue-card/80 backdrop-blur-sm border-baby-blue-border/40 hover:border-baby-blue-accent/60 transition-all duration-300 hover:shadow-xl hover:shadow-baby-blue-accent/20">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-baby-blue-accent/20">
                    <Fish className="h-8 w-8 text-baby-blue-accent" />
                  </div>
                </div>
                <CardTitle className="text-xl text-baby-blue-text">Fishing Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-baby-blue-text/80 leading-relaxed">
                  Discover fishing zones with coral health analysis and fish availability for seas, oceans, cities, and districts.
                </CardDescription>
                <Button 
                  onClick={() => onNavigate('fishing-zone')}
                  className="w-full bg-baby-blue-accent hover:bg-baby-blue-bright text-white"
                >
                  Explore Zones
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-baby-blue-border/30 bg-baby-blue-surface/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm text-baby-blue-text/70">
            © 2026. Built with <Heart className="inline h-4 w-4 text-coral" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-baby-blue-accent underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
