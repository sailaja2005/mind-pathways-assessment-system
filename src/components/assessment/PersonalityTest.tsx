
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalityTestProps {
  onBack: () => void;
}

const PersonalityTest = ({ onBack }: PersonalityTestProps) => {
  const { toast } = useToast();
  const [currentTrait, setCurrentTrait] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number[]>>({});

  const questions = {
    "Openness": [
      { text: "I enjoy exploring new ideas and concepts, even if they seem unconventional.", reverse: false },
      { text: "I am fascinated by abstract or theoretical problems in engineering.", reverse: false },
      { text: "I prefer sticking to familiar methods rather than experimenting with new approaches.", reverse: true },
      { text: "I often imagine creative ways to solve technical problems.", reverse: false },
      { text: "I find it exciting to learn about emerging technologies in my field.", reverse: false }
    ],
    "Conscientiousness": [
      { text: "I always complete my assignments and projects on time.", reverse: false },
      { text: "I pay close attention to details when working on technical tasks.", reverse: false },
      { text: "I tend to procrastinate on important tasks.", reverse: true },
      { text: "I plan my work carefully to ensure high-quality results.", reverse: false },
      { text: "I feel responsible for ensuring my team meets project goals.", reverse: false }
    ],
    "Extraversion": [
      { text: "I enjoy working in group settings on engineering projects.", reverse: false },
      { text: "I feel energized when presenting my ideas to others.", reverse: false },
      { text: "I prefer working alone rather than in a team.", reverse: true },
      { text: "I am comfortable taking the lead in group discussions or projects.", reverse: false },
      { text: "I find it easy to network with professionals in my field.", reverse: false }
    ],
    "Agreeableness": [
      { text: "I enjoy helping my peers solve technical problems.", reverse: false },
      { text: "I try to understand others' perspectives during team conflicts.", reverse: false },
      { text: "I prioritize my own goals over the team's needs.", reverse: true },
      { text: "I am patient when explaining complex engineering concepts to others.", reverse: false },
      { text: "I value maintaining positive relationships with my project teammates.", reverse: false }
    ],
    "Neuroticism": [
      { text: "I often feel stressed when facing tight project deadlines.", reverse: false },
      { text: "I remain calm when troubleshooting complex engineering issues.", reverse: true },
      { text: "I worry about making mistakes in my work.", reverse: false },
      { text: "I feel confident in my ability to handle unexpected technical challenges.", reverse: true },
      { text: "I tend to get anxious when presenting my work to others.", reverse: false }
    ]
  };

  const traits = Object.keys(questions);
  const currentTraitName = traits[currentTrait];
  const currentQuestionData = questions[currentTraitName as keyof typeof questions][currentQuestion];
  const totalQuestions = Object.values(questions).flat().length;
  const currentQuestionNumber = traits.slice(0, currentTrait).reduce((sum, trait) => 
    sum + questions[trait as keyof typeof questions].length, 0) + currentQuestion + 1;

  const handleAnswer = (score: number) => {
    const processedScore = currentQuestionData.reverse ? 6 - score : score;
    
    setResponses(prev => ({
      ...prev,
      [currentTraitName]: [...(prev[currentTraitName] || []), processedScore]
    }));

    if (currentQuestion < questions[currentTraitName as keyof typeof questions].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentTrait < traits.length - 1) {
      setCurrentTrait(currentTrait + 1);
      setCurrentQuestion(0);
    } else {
      handleTestCompletion();
    }
  };

  const handleTestCompletion = () => {
    // Calculate scores
    const scores: Record<string, number> = {};
    for (const [trait, responseArray] of Object.entries(responses)) {
      scores[trait] = responseArray.reduce((sum, score) => sum + score, 0) / responseArray.length;
    }

    toast({
      title: "Test Completed!",
      description: "Your personality assessment has been completed. Results will be available shortly.",
    });

    // In a real application, this would send data to the backend
    console.log("Final scores:", scores);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
        <div className="text-sm text-gray-600">
          Question {currentQuestionNumber} of {totalQuestions}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-700 flex items-center justify-center space-x-2">
            <Brain className="h-6 w-6" />
            <span>Big Five Personality Test</span>
          </CardTitle>
          <div className="text-center text-gray-600">
            <p className="font-semibold">{currentTraitName}</p>
            <p className="text-sm">Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800 mb-8 leading-relaxed">
              {currentQuestionData.text}
            </p>
          </div>

          <RadioGroup className="space-y-4">
            {[1, 2, 3, 4, 5].map((score) => (
              <div key={score} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                   onClick={() => handleAnswer(score)}>
                <RadioGroupItem value={score.toString()} id={score.toString()} />
                <Label htmlFor={score.toString()} className="cursor-pointer flex-1">
                  <span className="font-medium mr-2">{score}</span>
                  <span className="text-gray-600">
                    {score === 1 && "Strongly Disagree"}
                    {score === 2 && "Disagree"}
                    {score === 3 && "Neutral"}
                    {score === 4 && "Agree"}
                    {score === 5 && "Strongly Agree"}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="text-center text-sm text-gray-500">
            <p>Take your time to consider each statement carefully.</p>
            <p>There are no right or wrong answers - just be honest about yourself.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalityTest;
