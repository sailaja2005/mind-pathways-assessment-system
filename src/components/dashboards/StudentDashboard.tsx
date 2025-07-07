
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, BarChart3, Clock, CheckCircle, AlertCircle } from "lucide-react";
import PersonalityTest from "@/components/assessment/PersonalityTest";

const StudentDashboard = () => {
  const [showTest, setShowTest] = useState(false);
  const [testApproval] = useState({
    approved: true,
    counselorRemarks: "Student shows excellent academic performance and is ready for personality assessment. Please complete the Big Five test to better understand your learning style and preferences.",
    date: "2024-01-15"
  });

  if (showTest) {
    return <PersonalityTest onBack={() => setShowTest(false)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Student Dashboard</h2>
        <p className="text-gray-600">Track your assessments and personality insights</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Brain className="h-5 w-5 mr-2" />
              Personality Assessment
            </CardTitle>
            <CardDescription>Big Five Personality Test</CardDescription>
          </CardHeader>
          <CardContent>
            {testApproval.approved ? (
              <div className="space-y-4">
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Approved for Testing</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your counselor has approved you for the personality assessment. This test will help identify your personality traits and provide insights for your academic and career development.
                </p>
                <Button onClick={() => setShowTest(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Take Personality Test
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center text-amber-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">Awaiting Approval</span>
                </div>
                <p className="text-sm text-gray-600">
                  Please wait for your counselor to review your assessment and approve the personality test.
                </p>
                <Button disabled className="w-full">
                  Test Not Yet Available
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <FileText className="h-5 w-5 mr-2" />
              Counselor Feedback
            </CardTitle>
            <CardDescription>Latest remarks and suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">{testApproval.counselorRemarks}</p>
                <p className="text-xs text-gray-500 mt-2">Date: {testApproval.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
            Assessment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Initial Counseling Assessment</h4>
                <p className="text-sm text-gray-600">Completed on January 15, 2024</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg border-dashed">
              <div>
                <h4 className="font-semibold text-gray-500">Big Five Personality Test</h4>
                <p className="text-sm text-gray-400">Ready to complete</p>
              </div>
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
