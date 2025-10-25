import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskGaugeProps {
  title: string;
  risk: number;
  icon?: React.ReactNode;
}

export const RiskGauge = ({ title, risk, icon }: RiskGaugeProps) => {
  const [animatedRisk, setAnimatedRisk] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRisk(risk);
    }, 100);
    return () => clearTimeout(timer);
  }, [risk]);

  const getRiskColor = (value: number) => {
    if (value < 30) return "hsl(var(--success))";
    if (value < 60) return "hsl(var(--warning))";
    return "hsl(var(--danger))";
  };

  const getRiskLabel = (value: number) => {
    if (value < 30) return "Low Risk";
    if (value < 60) return "Moderate Risk";
    return "High Risk";
  };

  const rotation = (animatedRisk / 100) * 180 - 90;

  return (
    <Card className="w-full shadow-large border-2 backdrop-blur-sm bg-card/80 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl font-display">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center relative z-10">
        <div className="relative w-64 h-32 mb-4">
          {/* Background arc */}
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--success))" />
                <stop offset="50%" stopColor="hsl(var(--warning))" />
                <stop offset="100%" stopColor="hsl(var(--danger))" />
              </linearGradient>
            </defs>
            
            {/* Gauge background */}
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="20"
              strokeLinecap="round"
            />
            
            {/* Gauge fill */}
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke={`url(#gradient-${title})`}
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${(animatedRisk / 100) * 251.2}, 251.2`}
              style={{
                transition: "stroke-dasharray 1s ease-out",
              }}
            />
            
            {/* Needle */}
            <g transform={`rotate(${rotation} 100 90)`}>
              <line
                x1="100"
                y1="90"
                x2="100"
                y2="30"
                stroke={getRiskColor(animatedRisk)}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="90" r="6" fill={getRiskColor(animatedRisk)} />
            </g>
          </svg>
        </div>
        
        <div className="text-center space-y-2">
          <div 
            className="text-6xl font-display font-bold transition-all duration-500" 
            style={{ 
              color: getRiskColor(animatedRisk),
              textShadow: `0 0 20px ${getRiskColor(animatedRisk)}40`
            }}
          >
            {Math.round(animatedRisk)}%
          </div>
          <div className="text-lg font-semibold text-muted-foreground">
            {getRiskLabel(animatedRisk)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
