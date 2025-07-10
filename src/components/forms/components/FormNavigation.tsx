
import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";

interface FormNavigationProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onSubmit: () => void;
}

const FormNavigation = ({ 
  currentSection, 
  totalSections, 
  onPrevious, 
  onNext, 
  onSave, 
  onSubmit 
}: FormNavigationProps) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={currentSection === 1}
      >
        Previous
      </Button>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Progress
        </Button>

        {currentSection === totalSections ? (
          <Button onClick={onSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="h-4 w-4 mr-2" />
            Submit Assessment
          </Button>
        ) : (
          <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700">
            Next Section
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
