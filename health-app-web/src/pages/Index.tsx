import { useState } from "react";
import { HealthAssessmentForm } from "@/components/HealthAssessmentForm";
import { RiskGauge } from "@/components/RiskGauge";
import { Activity, Heart } from "lucide-react";

const Index = () => {
  const [results, setResults] = useState<{
    diabetesRisk: number;
    heartDiseaseRisk: number;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <h1 className="text-6xl font-display font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 animate-fade-in">
              Health Risk Assessment
            </h1>
          </div>
          <p className="text-xl text-muted-foreground animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.1s' }}>
            Advanced diabetes and heart disease risk analysis powered by comprehensive health metrics
          </p>
        </div>

        <div className="flex gap-6">
          <div className="grow animate-slide-up">
            <HealthAssessmentForm onResultsReceived={setResults} />
          </div>

          {results && (
            <div className="flex flex-col gap-8 animate-fade-in">
              <div className="transform transition-all duration-300 hover:scale-105">
                <RiskGauge
                  title="Diabetes Risk"
                  risk={results.diabetesRisk}
                  icon={<Activity className="h-6 w-6 text-primary" />}
                />
              </div>
              <div className="transform transition-all duration-300 hover:scale-105">
                <RiskGauge
                  title="Heart Disease Risk"
                  risk={results.heartDiseaseRisk}
                  icon={<Heart className="h-6 w-6 text-destructive" />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
