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

  const handleSave = () => {
    toast({
      title: "Progress Saved",
      description: "Your form data has been saved successfully.",
    });
  };

  const handleSubmit = () => {
    if (!formData.studentName.trim() || !formData.rollNumber.trim()) {
      toast({
        title: "Required Information Missing",
        description: "Please fill in the student's name and roll number before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Save the assessment data to localStorage
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
                  placeholder="e.g., Neha Alpani"
                />
              </div>
              <div>
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                  className="mt-1"
                  placeholder="e.g., 2024001"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">3) General Behaviour</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>a) Eating Habit</Label>
                <RadioGroup
                  value={formData.eatingHabit}
                  onValueChange={(value) => handleInputChange("eatingHabit", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="eating-good" />
                    <Label htmlFor="eating-good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="eating-fair" />
                    <Label htmlFor="eating-fair">Fair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="eating-poor" />
                    <Label htmlFor="eating-poor">Poor</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>b) Sleeping Habit</Label>
                <RadioGroup
                  value={formData.sleepingHabit}
                  onValueChange={(value) => handleInputChange("sleepingHabit", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="sleep-regular" />
                    <Label htmlFor="sleep-regular">Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="irregular" id="sleep-irregular" />
                    <Label htmlFor="sleep-irregular">Irregular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disturbed" id="sleep-disturbed" />
                    <Label htmlFor="sleep-disturbed">Disturbed</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>c) Cleanliness Habit</Label>
                <RadioGroup
                  value={formData.cleanlinessHabit}
                  onValueChange={(value) => handleInputChange("cleanlinessHabit", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neat" id="clean-neat" />
                    <Label htmlFor="clean-neat">Neat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="untidy" id="clean-untidy" />
                    <Label htmlFor="clean-untidy">Untidy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dirty" id="clean-dirty" />
                    <Label htmlFor="clean-dirty">Dirty</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>d) Dress Sense</Label>
                <RadioGroup
                  value={formData.dressSense}
                  onValueChange={(value) => handleInputChange("dressSense", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="appropriate" id="dress-appropriate" />
                    <Label htmlFor="dress-appropriate">Appropriate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inappropriate" id="dress-inappropriate" />
                    <Label htmlFor="dress-inappropriate">Inappropriate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bizarre" id="dress-bizarre" />
                    <Label htmlFor="dress-bizarre">Bizarre</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>e) Approach towards Faculty</Label>
                <RadioGroup
                  value={formData.approachTowardsFaculty}
                  onValueChange={(value) => handleInputChange("approachTowardsFaculty", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friendly" id="faculty-friendly" />
                    <Label htmlFor="faculty-friendly">Friendly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reserved" id="faculty-reserved" />
                    <Label htmlFor="faculty-reserved">Reserved</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hostile" id="faculty-hostile" />
                    <Label htmlFor="faculty-hostile">Hostile</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>f) Consciousness of Surroundings</Label>
                <RadioGroup
                  value={formData.consciousnessOfSurroundings}
                  onValueChange={(value) => handleInputChange("consciousnessOfSurroundings", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aware" id="conscious-aware" />
                    <Label htmlFor="conscious-aware">Aware</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partially-aware" id="conscious-partial" />
                    <Label htmlFor="conscious-partial">Partially Aware</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unaware" id="conscious-unaware" />
                    <Label htmlFor="conscious-unaware">Unaware</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">4) Speech</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>a) Form of Utterances</Label>
                <RadioGroup
                  value={formData.formOfUtterances}
                  onValueChange={(value) => handleInputChange("formOfUtterances", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clear" id="utterance-clear" />
                    <Label htmlFor="utterance-clear">Clear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unclear" id="utterance-unclear" />
                    <Label htmlFor="utterance-unclear">Unclear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mumbling" id="utterance-mumbling" />
                    <Label htmlFor="utterance-mumbling">Mumbling</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>b) Spontaneous</Label>
                <RadioGroup
                  value={formData.spontaneous}
                  onValueChange={(value) => handleInputChange("spontaneous", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="spontaneous-yes" />
                    <Label htmlFor="spontaneous-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="spontaneous-no" />
                    <Label htmlFor="spontaneous-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="spontaneous-sometimes" />
                    <Label htmlFor="spontaneous-sometimes">Sometimes</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>c) Speech Mannerism</Label>
                <RadioGroup
                  value={formData.speechMannerism}
                  onValueChange={(value) => handleInputChange("speechMannerism", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="speech-normal" />
                    <Label htmlFor="speech-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stuttering" id="speech-stuttering" />
                    <Label htmlFor="speech-stuttering">Stuttering</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="repetitive" id="speech-repetitive" />
                    <Label htmlFor="speech-repetitive">Repetitive</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>d) Tone</Label>
                <RadioGroup
                  value={formData.tone}
                  onValueChange={(value) => handleInputChange("tone", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pleasant" id="tone-pleasant" />
                    <Label htmlFor="tone-pleasant">Pleasant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="harsh" id="tone-harsh" />
                    <Label htmlFor="tone-harsh">Harsh</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monotone" id="tone-monotone" />
                    <Label htmlFor="tone-monotone">Monotone</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>e) Speech</Label>
                <RadioGroup
                  value={formData.speech}
                  onValueChange={(value) => handleInputChange("speech", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fluent" id="speech-fluent" />
                    <Label htmlFor="speech-fluent">Fluent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-fluent" id="speech-nonfluent" />
                    <Label htmlFor="speech-nonfluent">Non-fluent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hesitant" id="speech-hesitant" />
                    <Label htmlFor="speech-hesitant">Hesitant</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>f) Reaction Time</Label>
                <RadioGroup
                  value={formData.reactionTime}
                  onValueChange={(value) => handleInputChange("reactionTime", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quick" id="reaction-quick" />
                    <Label htmlFor="reaction-quick">Quick</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delayed" id="reaction-delayed" />
                    <Label htmlFor="reaction-delayed">Delayed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="appropriate" id="reaction-appropriate" />
                    <Label htmlFor="reaction-appropriate">Appropriate</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">5) Thought</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>a) Flight of Ideas</Label>
                <RadioGroup
                  value={formData.flightOfIdeas}
                  onValueChange={(value) => handleInputChange("flightOfIdeas", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="flight-present" />
                    <Label htmlFor="flight-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="flight-absent" />
                    <Label htmlFor="flight-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>b) Retardation of Thinking</Label>
                <RadioGroup
                  value={formData.retardationOfThinking}
                  onValueChange={(value) => handleInputChange("retardationOfThinking", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="retardation-present" />
                    <Label htmlFor="retardation-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="retardation-absent" />
                    <Label htmlFor="retardation-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>c) Circumstantial</Label>
                <RadioGroup
                  value={formData.circumstantial}
                  onValueChange={(value) => handleInputChange("circumstantial", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="circumstantial-present" />
                    <Label htmlFor="circumstantial-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="circumstantial-absent" />
                    <Label htmlFor="circumstantial-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>d) Preservation</Label>
                <RadioGroup
                  value={formData.preservation}
                  onValueChange={(value) => handleInputChange("preservation", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="preservation-present" />
                    <Label htmlFor="preservation-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="preservation-absent" />
                    <Label htmlFor="preservation-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>e) Thought Blocks</Label>
                <RadioGroup
                  value={formData.thoughtBlocks}
                  onValueChange={(value) => handleInputChange("thoughtBlocks", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="blocks-present" />
                    <Label htmlFor="blocks-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="blocks-absent" />
                    <Label htmlFor="blocks-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>f) Obsession</Label>
                <RadioGroup
                  value={formData.obsession}
                  onValueChange={(value) => handleInputChange("obsession", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="present" id="obsession-present" />
                    <Label htmlFor="obsession-present">Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absent" id="obsession-absent" />
                    <Label htmlFor="obsession-absent">Absent</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">6) Feelings and Emotions</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>a) Range</Label>
                <RadioGroup
                  value={formData.range}
                  onValueChange={(value) => handleInputChange("range", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wide" id="range-wide" />
                    <Label htmlFor="range-wide">Wide</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="restricted" id="range-restricted" />
                    <Label htmlFor="range-restricted">Restricted</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blunt" id="range-blunt" />
                    <Label htmlFor="range-blunt">Blunt</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>b) Intensity of Expression</Label>
                <RadioGroup
                  value={formData.intensityOfExpression}
                  onValueChange={(value) => handleInputChange("intensityOfExpression", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="intensity-high" />
                    <Label htmlFor="intensity-high">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="intensity-moderate" />
                    <Label htmlFor="intensity-moderate">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="intensity-low" />
                    <Label htmlFor="intensity-low">Low</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>c) Reactivity</Label>
                <RadioGroup
                  value={formData.reactivity}
                  onValueChange={(value) => handleInputChange("reactivity", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="responsive" id="reactivity-responsive" />
                    <Label htmlFor="reactivity-responsive">Responsive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-responsive" id="reactivity-nonresponsive" />
                    <Label htmlFor="reactivity-nonresponsive">Non-responsive</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>d) Mood</Label>
                <RadioGroup
                  value={formData.mood}
                  onValueChange={(value) => handleInputChange("mood", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="depressed" id="mood-depressed" />
                    <Label htmlFor="mood-depressed">Depressed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elated" id="mood-elated" />
                    <Label htmlFor="mood-elated">Elated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="euthymic" id="mood-euthymic" />
                    <Label htmlFor="mood-euthymic">Euthymic</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>e) Appropriateness</Label>
                <RadioGroup
                  value={formData.appropriateness}
                  onValueChange={(value) => handleInputChange("appropriateness", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="appropriate" id="appropriateness-appropriate" />
                    <Label htmlFor="appropriateness-appropriate">Appropriate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inappropriate" id="appropriateness-inappropriate" />
                    <Label htmlFor="appropriateness-inappropriate">Inappropriate</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>f) Liability</Label>
                <RadioGroup
                  value={formData.liability}
                  onValueChange={(value) => handleInputChange("liability", value)}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stable" id="liability-stable" />
                    <Label htmlFor="liability-stable">Stable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="labile" id="liability-labile" />
                    <Label htmlFor="liability-labile">Labile</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-emerald-700">7) Counselor's Remarks and Recommendation</h3>
            
            <div>
              <Label htmlFor="counselorRemarks">Final Assessment and Recommendations</Label>
              <Textarea
                id="counselorRemarks"
                value={formData.counselorRemarks}
                onChange={(e) => handleInputChange("counselorRemarks", e.target.value)}
                className="mt-1"
                rows={6}
                placeholder="Provide your professional assessment, recommendations, and approval for personality testing..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="approved"
                  checked={formData.approved}
                  onCheckedChange={(checked) => handleInputChange("approved", checked as boolean)}
                />
                <Label htmlFor="approved" className="font-semibold text-blue-800">
                  Approve student for personality testing
                </Label>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                By checking this box, you are approving <strong>{formData.studentName || "the student"}</strong> to take the Big Five Personality Test. 
                The student will be able to log in using their name and roll number to access the test only if approved.
              </p>
            </div>
            
            {formData.approved && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Assessment Completion</h4>
                <p className="text-sm text-green-700">
                  Student <strong>{formData.studentName || "the student"}</strong> will be approved for personality testing upon form submission.
                  The student will receive immediate access to the Big Five Personality Test.
                </p>
              </div>
            )}

            {!formData.approved && (
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Pending Approval</h4>
                <p className="text-sm text-amber-700">
                  The assessment will be submitted but the student will not be able to access the personality test until approval is granted.
                </p>
              </div>
            )}
          </div>
        );

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
