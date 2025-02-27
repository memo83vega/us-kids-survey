
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
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <Label htmlFor={question.id} className="text-base">
              {question.label}
            </Label>
            
            {question.type === "radio" && question.options && (
              <RadioGroup className="space-y-2">
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`${question.id}-${option.value}`}
                      {...question.register(question.id, { required: true })}
                    />
                    <Label htmlFor={`${question.id}-${option.value}`} className="text-sm">
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
                className="min-h-[100px] resize-none"
                placeholder="Type your response here..."
              />
            )}
            
            {question.error && (
              <p className="text-sm text-red-500 mt-1">{question.error.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
