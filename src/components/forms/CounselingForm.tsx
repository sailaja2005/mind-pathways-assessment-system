
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CounselingFormProps {
  onBack: () => void;
}

const CounselingForm = ({ onBack }: CounselingFormProps) => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 7;

  const [formData, setFormData] = useState({
    // General Information
    studentName: "",
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
    abstraction: ""
  });

  const handleInputChange = (field: string, value: string | string[]) => {
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

  const handleSave = () => {
    toast({
      title: "Progress Saved",
      description: "Your form data has been saved successfully.",
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Form Submitted",
      description: "Student assessment has been submitted successfully. The student will be notified about test approval.",
    });
    onBack();
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
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">1) General Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Name of the Student *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Gender *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="address">Address for Communication *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="education">Education *</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="motherName">Mother's Name</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="guardianName">Name of the Guardian (if applicable)</Label>
                <Input
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(e) => handleInputChange("guardianName", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fatherOccupation">Occupation (Father)</Label>
                <Input
                  id="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={(e) => handleInputChange("fatherOccupation", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="motherOccupation">Occupation (Mother)</Label>
                <Input
                  id="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={(e) => handleInputChange("motherOccupation", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="guardianOccupation">Occupation (Guardian)</Label>
                <Input
                  id="guardianOccupation"
                  value={formData.guardianOccupation}
                  onChange={(e) => handleInputChange("guardianOccupation", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Social Economic Status</Label>
              <RadioGroup
                value={formData.socioEconomicStatus}
                onValueChange={(value) => handleInputChange("socioEconomicStatus", value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ug" id="ug" />
                  <Label htmlFor="ug">UG</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pg" id="pg" />
                  <Label htmlFor="pg">PG</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Mobile Number</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="studentMobile">Student</Label>
                  <Input
                    id="studentMobile"
                    value={formData.studentMobile}
                    onChange={(e) => handleInputChange("studentMobile", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fatherMobile">Father</Label>
                  <Input
                    id="fatherMobile"
                    value={formData.fatherMobile}
                    onChange={(e) => handleInputChange("fatherMobile", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="motherMobile">Mother</Label>
                  <Input
                    id="motherMobile"
                    value={formData.motherMobile}
                    onChange={(e) => handleInputChange("motherMobile", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianMobile">Guardian</Label>
                  <Input
                    id="guardianMobile"
                    value={formData.guardianMobile}
                    onChange={(e) => handleInputChange("guardianMobile", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Email ID</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="studentEmail">Student</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={formData.studentEmail}
                    onChange={(e) => handleInputChange("studentEmail", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fatherEmail">Father</Label>
                  <Input
                    id="fatherEmail"
                    type="email"
                    value={formData.fatherEmail}
                    onChange={(e) => handleInputChange("fatherEmail", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="motherEmail">Mother</Label>
                  <Input
                    id="motherEmail"
                    type="email"
                    value={formData.motherEmail}
                    onChange={(e) => handleInputChange("motherEmail", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianEmail">Guardian</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => handleInputChange("guardianEmail", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">2) Family History</h3>
            
            <div>
              <Label htmlFor="familyHistory">Enter family history details *</Label>
              <Textarea
                id="familyHistory"
                value={formData.familyHistory}
                onChange={(e) => handleInputChange("familyHistory", e.target.value)}
                className="mt-1"
                rows={4}
                placeholder="Enter detailed family history information..."
              />
            </div>

            <div>
              <Label>a) Socio economic status</Label>
              <RadioGroup
                value={formData.annualIncome}
                onValueChange={(value) => handleInputChange("annualIncome", value)}
                className="flex flex-wrap gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="below-2lakh" id="below-2lakh" />
                  <Label htmlFor="below-2lakh">Annual Income &lt;2 lakh</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2l-8l" id="2l-8l" />
                  <Label htmlFor="2l-8l">2L-8L</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="8l-15l" id="8l-15l" />
                  <Label htmlFor="8l-15l">8L-15L</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="above-15l" id="above-15l" />
                  <Label htmlFor="above-15l">&gt;15L</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>b) Leadership Pattern</Label>
              <RadioGroup
                value={formData.leadershipPattern}
                onValueChange={(value) => handleInputChange("leadershipPattern", value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lead" id="lead" />
                  <Label htmlFor="lead">Lead</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="influence" id="influence" />
                  <Label htmlFor="influence">Influence</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="guide" id="guide" />
                  <Label htmlFor="guide">Guide</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>c) Role of Function</Label>
              <div className="space-y-3 mt-2">
                {["Joint family", "Nuclear family", "Single earning member", "More than one earning member"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={(formData.roleOfFunction as string[]).includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange("roleOfFunction", option, checked as boolean)}
                    />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>d) Communication</Label>
              <RadioGroup
                value={formData.communication}
                onValueChange={(value) => handleInputChange("communication", value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="comm-poor" />
                  <Label htmlFor="comm-poor">Poor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="comm-fair" />
                  <Label htmlFor="comm-fair">Fair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="comm-good" />
                  <Label htmlFor="comm-good">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-good" id="comm-very-good" />
                  <Label htmlFor="comm-very-good">Very Good</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      // Add other sections here (3-7)...
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">Section {currentSection}</h3>
            <p className="text-gray-600">Section {currentSection} content will be implemented here...</p>
          </div>
        );
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

          <div className="flex justify-between items-center pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevSection} 
              disabled={currentSection === 1}
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>

              {currentSection === totalSections ? (
                <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Assessment
                </Button>
              ) : (
                <Button onClick={nextSection} className="bg-emerald-600 hover:bg-emerald-700">
                  Next Section
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselingForm;
