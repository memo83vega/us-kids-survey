
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegister, FieldError } from "react-hook-form";

interface Question {
  id: string;
  label: string;
  type: "radio" | "textarea";
  options?: { value: string; label: string; }[];
  register: UseFormRegister<any>;
  error?: FieldError;
}

interface SurveySectionProps {
  title: string;
  questions: Question[];
}

export const SurveySection = ({ title, questions }: SurveySectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold tracking-tight text-blue-700 pb-2 border-b-2 border-yellow-300">{title}</h2>
      <div className="space-y-10">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4 bg-white rounded-lg p-5 shadow-sm transition-all hover:shadow-md">
            <Label htmlFor={question.id} className="text-base font-medium text-indigo-900">
              {question.label}
            </Label>
            
            {question.type === "radio" && question.options && (
              <RadioGroup className="space-y-3 pt-2">
                {question.options.map((option) => (
                  <div 
                    key={option.value} 
                    className="flex items-center space-x-3 p-3 rounded-lg border border-transparent bg-blue-50 hover:bg-blue-100 hover:border-blue-200 transition-colors"
                  >
                    <RadioGroupItem 
                      value={option.value} 
                      id={`${question.id}-${option.value}`}
                      {...question.register(question.id, { required: true })}
                      className="text-blue-600 border-blue-400 focus:ring-blue-500"
                    />
                    <Label htmlFor={`${question.id}-${option.value}`} className="text-sm text-indigo-800 font-medium cursor-pointer w-full">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {question.type === "textarea" && (
              <Textarea
                id={question.id}
                {...question.register(question.id)}
                className="min-h-[120px] resize-none rounded-lg border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-blue-50"
                placeholder="Type your response here..."
              />
            )}
            
            {question.error && (
              <p className="text-sm text-orange-500 mt-1 font-medium">{question.error.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
