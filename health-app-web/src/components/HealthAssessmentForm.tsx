import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const healthSchema = z.object({
  age: z.number().min(1).max(120),
  gender: z.enum(["male", "female"]),
  cholesterol: z.number().min(100).max(400),
  bloodPressure: z.number().min(80).max(200),
  glucose: z.number().min(50).max(400),
  bmi: z.number().min(10).max(60),
  maxHeartRate: z.number().min(60).max(220),
  stDepression: z.number().min(0).max(10),
  smokes: z.enum(["yes", "no"]),
  drinks: z.enum(["yes", "no"]),
  hereditary: z.enum(["yes", "no"]),
});

type HealthFormData = z.infer<typeof healthSchema>;

interface HealthAssessmentFormProps {
  onResultsReceived: (results: { diabetesRisk: number; heartDiseaseRisk: number }) => void;
}

export const HealthAssessmentForm = ({ onResultsReceived }: HealthAssessmentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HealthFormData>({
    resolver: zodResolver(healthSchema),
    defaultValues: {
      age: 30,
      gender: "male",
      cholesterol: 200,
      bloodPressure: 120,
      glucose: 100,
      bmi: 25,
      maxHeartRate: 150,
      stDepression: 1,
      smokes: "no",
      drinks: "no",
      hereditary: "no",
    }
  });

  const onSubmit = async (data: HealthFormData) => {
    setIsSubmitting(true);
    
    try {
      // const { data: result, error } = await supabase.functions.invoke('calculate-health-risk', {
      //   body: data,
      // });
      const resp = await fetch('/health', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await resp.json();
      console.log('result', result);
      // if (error) throw error;

      onResultsReceived(result);
      toast.success("Health assessment completed!");
    } catch (error) {
      console.error("Error calculating health risk:", error);
      toast.error("Failed to calculate health risk. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-large border-2 backdrop-blur-sm bg-card/80">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
        <CardTitle className="text-3xl font-display font-bold text-primary relative z-10">
          Health Risk Assessment
        </CardTitle>
        <CardDescription className="relative z-10">
          Please provide your health information for diabetes and heart disease risk analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true })}
                placeholder="35"
              />
              {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setValue("gender", value as "male" | "female")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
            </div>

            {/* Cholesterol */}
            <div className="space-y-2">
              <Label htmlFor="cholesterol">Cholesterol Level (mg/dL)</Label>
              <Input
                id="cholesterol"
                type="number"
                {...register("cholesterol", { valueAsNumber: true })}
                placeholder="200"
              />
              {errors.cholesterol && <p className="text-sm text-destructive">{errors.cholesterol.message}</p>}
            </div>

            {/* Blood Pressure */}
            <div className="space-y-2">
              <Label htmlFor="bloodPressure">Blood Pressure (systolic, mmHg)</Label>
              <Input
                id="bloodPressure"
                type="number"
                {...register("bloodPressure", { valueAsNumber: true })}
                placeholder="120"
              />
              {errors.bloodPressure && <p className="text-sm text-destructive">{errors.bloodPressure.message}</p>}
            </div>

            {/* Glucose */}
            <div className="space-y-2">
              <Label htmlFor="glucose">Glucose Level (mg/dL)</Label>
              <Input
                id="glucose"
                type="number"
                {...register("glucose", { valueAsNumber: true })}
                placeholder="100"
              />
              {errors.glucose && <p className="text-sm text-destructive">{errors.glucose.message}</p>}
            </div>

            {/* BMI */}
            <div className="space-y-2">
              <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                {...register("bmi", { valueAsNumber: true })}
                placeholder="25.5"
              />
              {errors.bmi && <p className="text-sm text-destructive">{errors.bmi.message}</p>}
            </div>

            {/* Max Heart Rate */}
            <div className="space-y-2">
              <Label htmlFor="maxHeartRate">Maximum Heart Rate (bpm)</Label>
              <Input
                id="maxHeartRate"
                type="number"
                {...register("maxHeartRate", { valueAsNumber: true })}
                placeholder="150"
              />
              {errors.maxHeartRate && <p className="text-sm text-destructive">{errors.maxHeartRate.message}</p>}
            </div>

            {/* ST Depression */}
            <div className="space-y-2">
              <Label htmlFor="stDepression">ST Depression (mm)</Label>
              <Input
                id="stDepression"
                type="number"
                step="0.1"
                {...register("stDepression", { valueAsNumber: true })}
                placeholder="0.5"
              />
              {errors.stDepression && <p className="text-sm text-destructive">{errors.stDepression.message}</p>}
            </div>

            {/* Smoking */}
            <div className="space-y-2">
              <Label htmlFor="smokes">Do you smoke?</Label>
              <Select onValueChange={(value) => setValue("smokes", value as "yes" | "no")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.smokes && <p className="text-sm text-destructive">{errors.smokes.message}</p>}
            </div>

            {/* Drinking */}
            <div className="space-y-2">
              <Label htmlFor="drinks">Do you drink alcohol?</Label>
              <Select onValueChange={(value) => setValue("drinks", value as "yes" | "no")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.drinks && <p className="text-sm text-destructive">{errors.drinks.message}</p>}
            </div>

            {/* Hereditary Diabetes */}
            <div className="space-y-2">
              <Label htmlFor="hereditary">Family history of diabetes?</Label>
              <Select onValueChange={(value) => setValue("hereditary", value as "yes" | "no")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.hereditary && <p className="text-sm text-destructive">{errors.hereditary.message}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-medium hover:shadow-glow" 
            size="lg" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Calculate Risk Assessment"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
