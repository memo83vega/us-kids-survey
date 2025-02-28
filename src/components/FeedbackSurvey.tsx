
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SurveySection } from "./SurveySection";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { submitSurveyResponse, surveySchema } from "@/services/surveyService";
import type { SurveyResponse } from "@/services/surveyService";

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
  } = useForm<SurveyResponse>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      overallEnjoyment: "",
      organizationQuality: "",
      supportSatisfaction: "",
      scheduleTimeliness: "",
      delaysComment: "",
      communication: "",
      troubleshooting: "",
      issuesComment: "",
      venueSetup: "",
      layoutComment: "",
      backupStrategies: "",
      backupComment: "",
      generalFeedback: ""
    }
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
    const answeredFields = requiredFields.filter(field => !!formValues[field as keyof SurveyResponse]);
    
    // Calculate progress as a percentage of answered required questions
    const progress = Math.round((answeredFields.length / requiredFields.length) * 100);
    
    setProgressValue(progress);
  }, [formValues]);

  const onSubmit = async (data: SurveyResponse) => {
    setIsSubmitting(true);
    
    try {
      // Send data to Supabase
      await submitSurveyResponse(data);

      // Show success message
      toast({
        title: "Thank you for your feedback!",
        description: "Your responses have been saved and will help us improve future events.",
        duration: 5000,
      });
      
      // Reset form
      reset();
      setCurrentSection(1);
      setProgressValue(0);
      
    } catch (error) {
      console.error("Error submitting survey:", error);
      
      // Show error message
      toast({
        title: "Submission failed",
        description: "We couldn't save your responses. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4 rounded-2xl shadow-lg mb-8 animate-bounce-in">
        <h1 className="text-4xl font-bold tracking-tight text-white">US Kids Local Tour Feedback Survey</h1>
        <p className="text-blue-100 max-w-2xl mx-auto font-medium">
          Thank you for participating in the US Kids Local Tour! Your feedback is essential for us to improve future events. Please take a few minutes to complete this survey.
        </p>
      </div>

      <div className="space-y-2 max-w-2xl mx-auto">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-blue-700">Your Progress</span>
          <span className="text-blue-700 font-bold">{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-3 bg-blue-100" 
          style={{
            background: "linear-gradient(to right, #eef9ff, #e6f5ff)",
          }} 
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 max-w-3xl mx-auto">
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
              className="w-32 rounded-full border-blue-400 text-blue-600 hover:bg-blue-50 transition-all"
            >
              Previous
            </Button>
          )}
          
          {currentSection < 3 ? (
            <Button
              type="button"
              onClick={() => setCurrentSection(currentSection + 1)}
              className="ml-auto w-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="ml-auto w-32 bg-gradient-to-r from-green-500 to-teal-500 rounded-full font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 mt-8 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-indigo-800">Outcome & Next Steps</h3>
        <ul className="space-y-3 text-indigo-700">
          <li className="flex items-start">
            <span className="mr-2 text-yellow-500 text-xl">•</span>
            <span>Data-Driven Insights: Your responses will be analyzed to highlight strengths and identify areas for improvement.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-yellow-500 text-xl">•</span>
            <span>Action Plan: We will use this feedback to refine our processes, update event checklists, adjust staffing strategies, and improve our communication protocols.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-yellow-500 text-xl">•</span>
            <span>Continuous Improvement: Regular review meetings will be held to integrate these insights into future event planning cycles, ensuring that every tournament is progressively better organized.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
