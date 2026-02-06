import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Mail, Lock, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Client-side navigation without real authentication
    onLogin();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-sky-200/40 to-blue-300/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-200/40 to-blue-200/40 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-sky-100/30 to-cyan-100/30 blur-3xl" />
      </div>

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/assets/generated/login-bg-baby-blue.dim_1920x1080.png)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo with Creative Styling */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-500 blur-xl opacity-60 animate-pulse" />
              <div className="relative h-28 w-28 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/50 backdrop-blur-sm">
                <img
                  src="/assets/generated/login-logo-baby-blue.dim_512x512.png"
                  alt="App Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-8 w-8 text-sky-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="mt-2 text-base text-sky-700/80">
                Sign in to continue your journey
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full space-y-6 rounded-3xl border-2 border-sky-200/50 bg-white/80 backdrop-blur-xl p-8 shadow-2xl">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50/80">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-sky-900">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900 placeholder:text-sky-400/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-sky-900">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900 placeholder:text-sky-400/60"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 hover:from-sky-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Login
              </Button>

              <p className="text-center text-xs text-sky-600/70">
                Secure and encrypted connection
              </p>
            </form>
          </div>

          {/* Footer */}
          <footer className="text-center text-xs text-sky-700/60">
            <p>
              © 2026. Built with ❤️ using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-600 underline-offset-4 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
