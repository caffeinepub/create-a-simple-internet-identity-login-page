import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X, Calculator, Heart } from 'lucide-react';

interface CalculatePageProps {
  onClose: () => void;
}

interface CalculationResult {
  index: number;
  condition: 'Good' | 'Normal' | 'Highly Polluted';
  color: string;
  impacts: string[];
  suggestions: string[];
}

export default function CalculatePage({ onClose }: CalculatePageProps) {
  const [oceanName, setOceanName] = useState('');
  const [temperature, setTemperature] = useState('');
  const [ph, setPh] = useState('');
  const [turbidity, setTurbidity] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCoralHealthIndex = () => {
    const temp = parseFloat(temperature);
    const phValue = parseFloat(ph);
    const turbidityValue = parseFloat(turbidity);
    const oxygenValue = parseFloat(oxygen);

    if (isNaN(temp) || isNaN(phValue) || isNaN(turbidityValue) || isNaN(oxygenValue)) {
      return;
    }

    // Coral Health Index calculation (simplified formula)
    // Ideal conditions: temp 25-28°C, pH 8.1-8.4, turbidity <5 NTU, oxygen >6 mg/L
    let score = 100;

    // Temperature impact (optimal: 25-28°C)
    if (temp < 20 || temp > 32) score -= 30;
    else if (temp < 23 || temp > 30) score -= 15;
    else if (temp < 25 || temp > 28) score -= 5;

    // pH impact (optimal: 8.1-8.4)
    if (phValue < 7.5 || phValue > 8.8) score -= 30;
    else if (phValue < 7.8 || phValue > 8.6) score -= 15;
    else if (phValue < 8.0 || phValue > 8.5) score -= 5;

    // Turbidity impact (optimal: <5 NTU)
    if (turbidityValue > 20) score -= 25;
    else if (turbidityValue > 10) score -= 15;
    else if (turbidityValue > 5) score -= 5;

    // Oxygen impact (optimal: >6 mg/L)
    if (oxygenValue < 3) score -= 25;
    else if (oxygenValue < 5) score -= 15;
    else if (oxygenValue < 6) score -= 5;

    const finalScore = Math.max(0, Math.min(100, score));

    let condition: 'Good' | 'Normal' | 'Highly Polluted';
    let color: string;
    let impacts: string[];
    let suggestions: string[];

    if (finalScore >= 70) {
      condition = 'Good';
      color = 'text-green-700 bg-green-50 border-green-200';
      impacts = [
        'Coral reefs are thriving with healthy growth rates',
        'Marine biodiversity is well-maintained',
        'Ecosystem services are functioning optimally',
      ];
      suggestions = [
        'Continue monitoring water quality regularly',
        'Maintain current conservation efforts',
        'Educate local communities about sustainable practices',
      ];
    } else if (finalScore >= 40) {
      condition = 'Normal';
      color = 'text-amber-700 bg-amber-50 border-amber-200';
      impacts = [
        'Coral growth may be slower than optimal',
        'Some stress indicators visible in marine life',
        'Ecosystem resilience is moderately reduced',
      ];
      suggestions = [
        'Increase monitoring frequency',
        'Investigate sources of water quality degradation',
        'Implement targeted conservation measures',
        'Reduce local pollution sources',
      ];
    } else {
      condition = 'Highly Polluted';
      color = 'text-red-700 bg-red-50 border-red-200';
      impacts = [
        'Severe coral bleaching and mortality risk',
        'Significant loss of marine biodiversity',
        'Ecosystem collapse potential',
        'Loss of coastal protection services',
      ];
      suggestions = [
        'Immediate intervention required',
        'Identify and eliminate pollution sources urgently',
        'Implement emergency conservation protocols',
        'Restrict harmful activities in the area',
        'Consider coral restoration programs',
      ];
    }

    setResult({
      index: finalScore,
      condition,
      color,
      impacts,
      suggestions,
    });
  };

  const handleCalculate = () => {
    calculateCoralHealthIndex();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sky-600 hover:text-sky-700 hover:bg-sky-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Calculator Card */}
        <Card className="border-2 border-sky-200/50 bg-white/80 backdrop-blur-xl shadow-2xl mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Coral Health Index Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Ocean Name */}
            <div className="space-y-2">
              <Label htmlFor="oceanName" className="text-sm font-semibold text-sky-900">
                Sea or Ocean Name
              </Label>
              <Input
                id="oceanName"
                type="text"
                placeholder="e.g., Great Barrier Reef"
                value={oceanName}
                onChange={(e) => setOceanName(e.target.value)}
                className="h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <Label htmlFor="temperature" className="text-sm font-semibold text-sky-900">
                Enter Temperature (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="e.g., 26.5"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900"
              />
            </div>

            {/* pH Value */}
            <div className="space-y-2">
              <Label htmlFor="ph" className="text-sm font-semibold text-sky-900">
                Enter pH Value
              </Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                placeholder="e.g., 8.2"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900"
              />
            </div>

            {/* Turbidity */}
            <div className="space-y-2">
              <Label htmlFor="turbidity" className="text-sm font-semibold text-sky-900">
                Turbidity (NTU)
              </Label>
              <Input
                id="turbidity"
                type="number"
                step="0.1"
                placeholder="e.g., 3.5"
                value={turbidity}
                onChange={(e) => setTurbidity(e.target.value)}
                className="h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900"
              />
            </div>

            {/* Oxygen Level */}
            <div className="space-y-2">
              <Label htmlFor="oxygen" className="text-sm font-semibold text-sky-900">
                Oxygen Level (mg/L)
              </Label>
              <Input
                id="oxygen"
                type="number"
                step="0.1"
                placeholder="e.g., 7.2"
                value={oxygen}
                onChange={(e) => setOxygen(e.target.value)}
                className="h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900"
              />
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleCalculate}
                disabled={!oceanName || !temperature || !ph || !turbidity || !oxygen}
                className="w-full max-w-xs h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 hover:from-sky-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Index Result */}
            <Card className="border-2 border-sky-200/50 bg-white/80 backdrop-blur-xl shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-sky-900">Coral Health Index</h3>
                  <div className="text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    {result.index.toFixed(1)}
                  </div>
                  <div className={`inline-block px-6 py-3 rounded-xl border-2 font-bold text-lg ${result.color}`}>
                    {result.condition}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impacts */}
            <Card className="border-2 border-sky-200/50 bg-white/80 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-sky-900">Environmental Impacts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.impacts.map((impact, index) => (
                    <li key={index} className="flex items-start gap-2 text-sky-800">
                      <span className="text-sky-500 mt-1">•</span>
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="border-2 border-sky-200/50 bg-white/80 backdrop-blur-xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-sky-900">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sky-800">
                      <span className="text-blue-500 mt-1">→</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-sky-700/60">
          <p>
            © 2026. Built with <Heart className="inline h-4 w-4 text-red-400" /> using{' '}
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
  );
}
