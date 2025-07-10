import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CounselingFormData } from "./types/counselingFormTypes";
import { mapFormDataToDatabase } from "@/utils/counselingFormMapper";
import GeneralInformationSection from "./sections/GeneralInformationSection";
import FamilyHistorySection from "./sections/FamilyHistorySection";
import GeneralBehaviourSection from "./sections/GeneralBehaviourSection";
import SpeechSection from "./sections/SpeechSection";
import ThoughtSection from "./sections/ThoughtSection";
import FeelingsEmotionsSection from "./sections/FeelingsEmotionsSection";
import CounselorRemarksSection from "./sections/CounselorRemarksSection";
import FormNavigation from "./components/FormNavigation";

interface CounselingFormProps {
  onBack: () => void;
}

const CounselingForm = ({ onBack }: CounselingFormProps) => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSections = 7;

  const [formData, setFormData] = useState<CounselingFormData>({
    // General Information
    studentName: "",
    rollNumber: "",
    age: "",
    gender: "",
    address: "",
    education: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    fatherOccupation: "",
    motherOccupation: "",
    guardianOccupation: "",
    socioEconomicStatus: "",
    studentMobile: "",
    fatherMobile: "",
    motherMobile: "",
    guardianMobile: "",
    studentEmail: "",
    fatherEmail: "",
    motherEmail: "",
    guardianEmail: "",
    
    // Family History
    familyHistory: "",
    annualIncome: "",
    leadershipPattern: "",
    roleOfFunction: [],
    communication: "",
    
    // General Behaviour
    eatingHabit: "",
    sleepingHabit: "",
    cleanlinessHabit: "",
    dressSense: "",
    approachTowardsFaculty: "",
    consciousnessOfSurroundings: "",
    inTouchWithSurroundings: "",
    approachOfStudent: "",
    responsivenessOfStudent: "",
    mannerism: "",
    
    // Speech
    formOfUtterances: "",
    spontaneous: "",
    speechMannerism: "",
    tone: "",
    speech: "",
    reactionTime: "",
    relevanceAndCoherence: "",
    prosody: "",
    
    // Thought
    flightOfIdeas: "",
    retardationOfThinking: "",
    circumstantial: "",
    preservation: "",
    thoughtBlocks: "",
    obsession: "",
    hallucinations: "",
    delusions: "",
    sinAndGuilt: "",
    
    // Feelings and emotions
    range: "",
    intensityOfExpression: "",
    reactivity: "",
    mood: "",
    diurnalVariations: "",
    congruityWith: "",
    appropriateness: "",
    liability: "",
    
    // Cognitive
    levelOfAwareness: "",
    insight: "",
    orientation: "",
    memory: "",
    intelligence: "",
    judgement: "",
    abstraction: "",
    
    // Counselor's final remarks
    counselorRemarks: "",
    approved: false
  });

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = formData[field as keyof typeof formData] as string[];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(field, currentValues.filter(item => item !== value));
    }
  };

  const handleSave = async () => {
    if (!formData.studentName.trim() || !formData.rollNumber.trim()) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in the student's name and roll number before saving.",
        variant: "destructive"
      });
      return;
    }

    try {
      const dbData = mapFormDataToDatabase(formData);
      
      // Check if assessment already exists
      const { data: existingAssessment } = await supabase
        .from('counseling_assessments')
        .select('id')
        .eq('student_name', formData.studentName)
        .eq('roll_number', formData.rollNumber)
        .single();

      if (existingAssessment) {
        // Update existing assessment
        const { error } = await supabase
          .from('counseling_assessments')
          .update(dbData)
          .eq('id', existingAssessment.id);

        if (error) throw error;
      } else {
        // Insert new assessment
        const { error } = await supabase
          .from('counseling_assessments')
          .insert([dbData]);

        if (error) throw error;
      }

      toast({
        title: "Progress Saved",
        description: "Your form data has been saved successfully to the database.",
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.studentName.trim() || !formData.rollNumber.trim()) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in the student's name and roll number before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dbData = mapFormDataToDatabase(formData);
      
      // Check if assessment already exists
      const { data: existingAssessment } = await supabase
        .from('counseling_assessments')
        .select('id')
        .eq('student_name', formData.studentName)
        .eq('roll_number', formData.rollNumber)
        .single();

      if (existingAssessment) {
        // Update existing assessment
        const { error } = await supabase
          .from('counseling_assessments')
          .update(dbData)
          .eq('id', existingAssessment.id);

        if (error) throw error;
      } else {
        // Insert new assessment
        const { error } = await supabase
          .from('counseling_assessments')
          .insert([dbData]);

        if (error) throw error;
      }

      // Also keep the localStorage backup for compatibility (remove this later if not needed)
      const existingAssessments = JSON.parse(localStorage.getItem('submittedAssessments') || '[]');
      const newAssessment = {
        ...formData,
        submissionDate: new Date().toISOString().split('T')[0],
        status: formData.approved ? 'approved' : 'pending',
        testCompleted: false,
        counselorRemarks: formData.counselorRemarks || `Student ${formData.studentName} has been assessed and ${formData.approved ? 'approved' : 'is awaiting approval'} for personality testing.`
      };
      const updatedAssessments = [...existingAssessments, newAssessment];
      localStorage.setItem('submittedAssessments', JSON.stringify(updatedAssessments));

      toast({
        title: "Assessment Submitted Successfully",
        description: `Assessment for ${formData.studentName} has been completed${formData.approved ? ' and approved for personality testing. The student can now login to take the test.' : ' and is awaiting approval.'}`,
      });
      
      onBack();
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the assessment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderSection = () => {
    const sectionProps = {
      formData,
      onInputChange: handleInputChange,
      onCheckboxChange: handleCheckboxChange
    };

    switch (currentSection) {
      case 1:
        return <GeneralInformationSection {...sectionProps} />;
      case 2:
        return <FamilyHistorySection {...sectionProps} />;
      case 3:
        return <GeneralBehaviourSection {...sectionProps} />;
      case 4:
        return <SpeechSection {...sectionProps} />;
      case 5:
        return <ThoughtSection {...sectionProps} />;
      case 6:
        return <FeelingsEmotionsSection {...sectionProps} />;
      case 7:
        return <CounselorRemarksSection {...sectionProps} />;
      default:
        return <GeneralInformationSection {...sectionProps} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
        <div className="text-sm text-gray-600">
          Section {currentSection} of {totalSections}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-emerald-700">STUDENT COUNSELLING FORM</CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentSection / totalSections) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderSection()}

          <FormNavigation
            currentSection={currentSection}
            totalSections={totalSections}
            onPrevious={prevSection}
            onNext={nextSection}
            onSave={handleSave}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselingForm;
