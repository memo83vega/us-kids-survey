
import supabase from '@/lib/supabase';
import { z } from 'zod';

export type SurveyResponse = z.infer<typeof surveySchema>;

// Define the schema (same as in your FeedbackSurvey component)
export const surveySchema = z.object({
  overallEnjoyment: z.string().min(1, "Please select an option"),
  organizationQuality: z.string().min(1, "Please select an option"),
  supportSatisfaction: z.string().min(1, "Please select an option"),
  scheduleTimeliness: z.string().min(1, "Please select an option"),
  delaysComment: z.string().optional().nullable(),
  communication: z.string().min(1, "Please select an option"),
  troubleshooting: z.string().min(1, "Please select an option"),
  issuesComment: z.string().optional().nullable(),
  venueSetup: z.string().min(1, "Please select an option"),
  layoutComment: z.string().optional().nullable(),
  backupStrategies: z.string().min(1, "Please select an option"),
  backupComment: z.string().optional().nullable(),
  generalFeedback: z.string().optional().nullable(),
});

export async function submitSurveyResponse(data: SurveyResponse) {
  console.log('Submitting survey response:', data);
  
  try {
    // Add submission timestamp
    const submissionData = {
      ...data,
      submitted_at: new Date().toISOString(),
    };

    // Check if Supabase is properly initialized
    if (!supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Supabase client is not initialized');
    }

    // Log that we're about to insert data
    console.log('Inserting data into survey_responses table:', submissionData);

    const { data: result, error } = await supabase
      .from('survey_responses')
      .insert([submissionData]);

    if (error) {
      console.error('Error submitting survey to Supabase:', error);
      throw new Error(`Failed to submit survey: ${error.message}`);
    }

    console.log('Survey submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('Exception in submitSurveyResponse:', error);
    throw error;
  }
}
