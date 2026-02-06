import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Shield } from 'lucide-react';

export default function AuthedLandingPage() {
  const { identity, clear } = useInternetIdentity();

  const principal = identity?.getPrincipal().toString() || '';
  const shortPrincipal = principal ? `${principal.slice(0, 8)}...${principal.slice(-6)}` : '';
  const initials = principal.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-lg">
              <img
                src="/assets/generated/login-logo.dim_512x512.png"
                alt="App Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          </div>
          <Button onClick={clear} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome to Your Account
            </h2>
            <p className="text-muted-foreground">
              You're successfully authenticated with Internet Identity
            </p>
          </div>

          {/* Account Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your authenticated identity details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">Principal ID</p>
                  <p className="break-all font-mono text-xs text-muted-foreground">
                    {principal}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Short: <span className="font-mono">{shortPrincipal}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
                <Shield className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">Authentication Status</p>
                  <p className="text-xs text-muted-foreground">
                    Securely authenticated via Internet Identity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Your application is ready to be customized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is your authenticated landing page. You can now build additional features
                and functionality for your application. Your identity is securely managed by
                Internet Identity on the Internet Computer.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
          <p>
            © 2026. Built with ❤️ using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
