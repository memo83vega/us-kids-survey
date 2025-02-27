
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SurveySection } from "./SurveySection";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const surveySchema = z.object({
  overallEnjoyment: z.string(),
  organizationQuality: z.string(),
  supportSatisfaction: z.string(),
  scheduleTimeliness: z.string(),
  delaysComment: z.string().optional(),
  communication: z.string(),
  troubleshooting: z.string(),
  issuesComment: z.string().optional(),
  venueSetup: z.string(),
  layoutComment: z.string().optional(),
  backupStrategies: z.string(),
  backupComment: z.string().optional(),
  generalFeedback: z.string().optional(),
});

type SurveyData = z.infer<typeof surveySchema>;

export const FeedbackSurvey = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
  });

  // Watch all form fields to calculate progress
  const formValues = watch();

  // Calculate progress based on answered questions
  useEffect(() => {
    const requiredFields = [
      'overallEnjoyment', 
      'organizationQuality', 
      'supportSatisfaction', 
      'scheduleTimeliness',
      'communication',
      'troubleshooting',
      'venueSetup',
      'backupStrategies'
    ];
    
    // Count how many required fields have been answered
    const answeredFields = requiredFields.filter(field => !!formValues[field as keyof SurveyData]);
    
    // Calculate progress as a percentage of answered required questions
    const progress = Math.round((answeredFields.length / requiredFields.length) * 100);
    
    setProgressValue(progress);
  }, [formValues]);

  const onSubmit = async (data: SurveyData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    toast({
      title: "Thank you for your feedback!",
      description: "Your responses will help us improve future events.",
      duration: 5000,
    });
    reset();
    setCurrentSection(1);
    setProgressValue(0);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">US Kids Local Tour Feedback Survey</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Thank you for participating in the US Kids Local Tour! Your feedback is essential for us to improve future events. Please take a few minutes to complete this survey.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {currentSection === 1 && (
          <SurveySection
            title="Participant Satisfaction"
            questions={[
              {
                id: "overallEnjoyment",
                label: "How would you rate your overall enjoyment of the event?",
                type: "radio",
                options: [
                  { value: "1", label: "Very Poor" },
                  { value: "2", label: "Poor" },
                  { value: "3", label: "Average" },
                  { value: "4", label: "Good" },
                  { value: "5", label: "Excellent" },
                ],
                register,
                error: errors.overallEnjoyment,
              },
              {
                id: "organizationQuality",
                label: "How satisfied were you with the organization of the tournament?",
                type: "radio",
                options: [
                  { value: "1", label: "Very Unsatisfied" },
                  { value: "2", label: "Unsatisfied" },
                  { value: "3", label: "Neutral" },
                  { value: "4", label: "Satisfied" },
                  { value: "5", label: "Very Satisfied" },
                ],
                register,
                error: errors.organizationQuality,
              },
              {
                id: "supportSatisfaction",
                label: "How would you rate your satisfaction with the registration, check-in process, and on-site support?",
                type: "radio",
                options: [
                  { value: "1", label: "Very Poor" },
                  { value: "2", label: "Poor" },
                  { value: "3", label: "Average" },
                  { value: "4", label: "Good" },
                  { value: "5", label: "Excellent" },
                ],
                register,
                error: errors.supportSatisfaction,
              },
            ]}
          />
        )}

        {currentSection === 2 && (
          <SurveySection
            title="Logistical Efficiency"
            questions={[
              {
                id: "scheduleTimeliness",
                label: "Was the event schedule followed as planned?",
                type: "radio",
                options: [
                  { value: "yes", label: "Yes" },
                  { value: "somewhat", label: "Somewhat" },
                  { value: "no", label: "No" },
                ],
                register,
                error: errors.scheduleTimeliness,
              },
              {
                id: "delaysComment",
                label: "Please elaborate on any delays or issues experienced (optional):",
                type: "textarea",
                register,
                error: errors.delaysComment,
              },
              {
                id: "communication",
                label: "How clear and effective were the communications during the event?",
                type: "radio",
                options: [
                  { value: "1", label: "Very Ineffective" },
                  { value: "2", label: "Ineffective" },
                  { value: "3", label: "Neutral" },
                  { value: "4", label: "Effective" },
                  { value: "5", label: "Very Effective" },
                ],
                register,
                error: errors.communication,
              },
              {
                id: "troubleshooting",
                label: "How would you rate the handling of any issues or troubleshooting during the event?",
                type: "radio",
                options: [
                  { value: "1", label: "Very Poor" },
                  { value: "2", label: "Poor" },
                  { value: "3", label: "Average" },
                  { value: "4", label: "Good" },
                  { value: "5", label: "Excellent" },
                ],
                register,
                error: errors.troubleshooting,
              },
              {
                id: "issuesComment",
                label: "If you experienced any issues, please describe them and how they were resolved (optional):",
                type: "textarea",
                register,
                error: errors.issuesComment,
              },
            ]}
          />
        )}

        {currentSection === 3 && (
          <SurveySection
            title="Overall Event Execution"
            questions={[
              {
                id: "venueSetup",
                label: "How would you rate the event layout and overall venue setup?",
                type: "radio",
                options: [
                  { value: "1", label: "Very Poor" },
                  { value: "2", label: "Poor" },
                  { value: "3", label: "Average" },
                  { value: "4", label: "Good" },
                  { value: "5", label: "Excellent" },
                ],
                register,
                error: errors.venueSetup,
              },
              {
                id: "layoutComment",
                label: "What improvements would you suggest for the layout or venue (optional):",
                type: "textarea",
                register,
                error: errors.layoutComment,
              },
              {
                id: "backupStrategies",
                label: "How effective were the backup strategies and contingency plans during the event?",
                type: "radio",
                options: [
                  { value: "1", label: "Not Effective" },
                  { value: "2", label: "Somewhat Ineffective" },
                  { value: "3", label: "Neutral" },
                  { value: "4", label: "Effective" },
                  { value: "5", label: "Very Effective" },
                ],
                register,
                error: errors.backupStrategies,
              },
              {
                id: "backupComment",
                label: "Please provide any suggestions for enhancing our backup plans (optional):",
                type: "textarea",
                register,
                error: errors.backupComment,
              },
              {
                id: "generalFeedback",
                label: "Please share any additional comments, suggestions, or areas where you feel we could improve:",
                type: "textarea",
                register,
                error: errors.generalFeedback,
              },
            ]}
          />
        )}

        <div className="flex justify-between space-x-4">
          {currentSection > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentSection(currentSection - 1)}
              className="w-32"
            >
              Previous
            </Button>
          )}
          
          {currentSection < 3 ? (
            <Button
              type="button"
              onClick={() => setCurrentSection(currentSection + 1)}
              className="ml-auto w-32"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="ml-auto w-32"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
        <h3 className="text-lg font-semibold mb-4">Outcome & Next Steps</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Data-Driven Insights: Your responses will be analyzed to highlight strengths and identify areas for improvement.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Action Plan: We will use this feedback to refine our processes, update event checklists, adjust staffing strategies, and improve our communication protocols.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Continuous Improvement: Regular review meetings will be held to integrate these insights into future event planning cycles, ensuring that every tournament is progressively better organized.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
