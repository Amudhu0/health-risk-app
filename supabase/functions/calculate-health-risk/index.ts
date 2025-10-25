import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HealthData {
  age: number;
  gender: string;
  cholesterol: number;
  bloodPressure: number;
  glucose: number;
  bmi: number;
  maxHeartRate: number;
  stDepression: number;
  smokes: string;
  drinks: string;
  hereditary: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const healthData: HealthData = await req.json();
    
    console.log('Received health data:', healthData);

    // Calculate diabetes risk (simplified algorithm for demonstration)
    let diabetesRisk = 20; // Base risk
    
    if (healthData.glucose > 125) diabetesRisk += 25;
    else if (healthData.glucose > 100) diabetesRisk += 15;
    
    if (healthData.bmi > 30) diabetesRisk += 20;
    else if (healthData.bmi > 25) diabetesRisk += 10;
    
    if (healthData.hereditary === 'yes') diabetesRisk += 15;
    if (healthData.age > 45) diabetesRisk += 10;
    if (healthData.bloodPressure > 130) diabetesRisk += 5;
    
    // Add some randomness
    diabetesRisk += Math.random() * 10;
    diabetesRisk = Math.min(Math.max(diabetesRisk, 5), 95);

    // Calculate heart disease risk (simplified algorithm for demonstration)
    let heartDiseaseRisk = 15; // Base risk
    
    if (healthData.cholesterol > 240) heartDiseaseRisk += 25;
    else if (healthData.cholesterol > 200) heartDiseaseRisk += 15;
    
    if (healthData.bloodPressure > 140) heartDiseaseRisk += 20;
    else if (healthData.bloodPressure > 120) heartDiseaseRisk += 10;
    
    if (healthData.smokes === 'yes') heartDiseaseRisk += 20;
    if (healthData.stDepression > 2) heartDiseaseRisk += 15;
    if (healthData.age > 55) heartDiseaseRisk += 10;
    if (healthData.maxHeartRate < 100) heartDiseaseRisk += 10;
    if (healthData.bmi > 30) heartDiseaseRisk += 5;
    
    // Add some randomness
    heartDiseaseRisk += Math.random() * 10;
    heartDiseaseRisk = Math.min(Math.max(heartDiseaseRisk, 5), 95);

    console.log('Calculated risks:', {
      diabetesRisk: Math.round(diabetesRisk),
      heartDiseaseRisk: Math.round(heartDiseaseRisk)
    });

    return new Response(
      JSON.stringify({
        diabetesRisk: Math.round(diabetesRisk),
        heartDiseaseRisk: Math.round(heartDiseaseRisk),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing health risk calculation:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
