
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, FileText, BarChart3, Clock, CheckCircle, AlertCircle, User, Hash } from "lucide-react";
import PersonalityTest from "@/components/assessment/PersonalityTest";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const [showTest, setShowTest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ name: "", rollNumber: "" });
  const [studentAssessment, setStudentAssessment] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if student is already logged in
    const storedLogin = localStorage.getItem('studentLogin');
    if (storedLogin) {
      const loginInfo = JSON.parse(storedLogin);
      setIsLoggedIn(true);
      setLoginData(loginInfo);
      loadStudentAssessment(loginInfo.name, loginInfo.rollNumber);
    }
  }, []);

  const loadStudentAssessment = (name: string, rollNumber: string) => {
    const assessments = JSON.parse(localStorage.getItem('submittedAssessments') || '[]');
    const studentAssess = assessments.find(
      (assessment: any) => 
        assessment.studentName.toLowerCase() === name.toLowerCase() && 
        assessment.rollNumber === rollNumber
    );
    setStudentAssessment(studentAssess || null);
  };

  const handleLogin = () => {
    if (!loginData.name.trim() || !loginData.rollNumber.trim()) {
      toast({
        title: "Login Required",
        description: "Please enter both your name and roll number.",
        variant: "destructive"
      });
      return;
    }

    // Check if assessment exists for this student
    const assessments = JSON.parse(localStorage.getItem('submittedAssessments') || '[]');
    const studentAssess = assessments.find(
      (assessment: any) => 
        assessment.studentName.toLowerCase() === loginData.name.toLowerCase() && 
        assessment.rollNumber === loginData.rollNumber
    );

    if (!studentAssess) {
      toast({
        title: "No Assessment Found",
        description: "No counselor assessment found for this student. Please contact your counselor.",
        variant: "destructive"
      });
      return;
    }

    setStudentAssessment(studentAssess);
    setIsLoggedIn(true);
    localStorage.setItem('studentLogin', JSON.stringify(loginData));
    
    toast({
      title: "Login Successful",
      description: `Welcome ${loginData.name}! You can now access your assessment.`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ name: "", rollNumber: "" });
    setStudentAssessment(null);
    localStorage.removeItem('studentLogin');
  };

  const handleTestComplete = () => {
    if (studentAssessment) {
      // Update the assessment to mark test as completed
      const assessments = JSON.parse(localStorage.getItem('submittedAssessments') || '[]');
      const updatedAssessments = assessments.map((assessment: any) => {
        if (assessment.studentName.toLowerCase() === loginData.name.toLowerCase() && 
            assessment.rollNumber === loginData.rollNumber) {
          return { ...assessment, testCompleted: true, testCompletionDate: new Date().toISOString().split('T')[0] };
        }
        return assessment;
      });
      localStorage.setItem('submittedAssessments', JSON.stringify(updatedAssessments));
      setStudentAssessment({ ...studentAssessment, testCompleted: true });
    }
    setShowTest(false);
  };

  if (showTest) {
    return <PersonalityTest onBack={() => setShowTest(false)} onComplete={handleTestComplete} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                <Brain className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Student Login</CardTitle>
              <CardDescription>
                Enter your details to access your personality assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={loginData.name}
                    onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder="Enter your roll number"
                    value={loginData.rollNumber}
                    onChange={(e) => setLoginData(prev => ({ ...prev, rollNumber: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                Access Dashboard
              </Button>

              <p className="text-xs text-gray-500 text-center">
                You can only access if your counselor has completed your assessment
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Student Dashboard</h2>
          <p className="text-gray-600">Welcome {loginData.name} (Roll No: {loginData.rollNumber})</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
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
            {studentAssessment ? (
              <div className="space-y-4">
                {studentAssessment.testCompleted ? (
                  <div className="space-y-4">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Test Completed</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      You have successfully completed the personality assessment. Your results are being processed.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-700">Completed on: {studentAssessment.testCompletionDate}</p>
                    </div>
                  </div>
                ) : studentAssessment.status === 'approved' ? (
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
                      <span className="font-medium">Assessment Under Review</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your counselor has completed your assessment and it's currently being reviewed for test approval.
                    </p>
                    <Button disabled className="w-full">
                      Test Approval Pending
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center text-gray-500">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">No Assessment Found</span>
                </div>
                <p className="text-sm text-gray-600">
                  No counselor assessment found. Please contact your counselor to complete your assessment first.
                </p>
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
              {studentAssessment ? (
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">{studentAssessment.counselorRemarks || "Assessment completed successfully. Student shows good potential for personality testing."}</p>
                  <p className="text-xs text-gray-500 mt-2">Date: {studentAssessment.submissionDate}</p>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No counselor feedback available yet</p>
                </div>
              )}
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
            {studentAssessment ? (
              <>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Counselor Assessment</h4>
                    <p className="text-sm text-gray-600">Completed on {studentAssessment.submissionDate}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className={`font-semibold ${studentAssessment.testCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                      Big Five Personality Test
                    </h4>
                    <p className="text-sm text-gray-600">
                      {studentAssessment.testCompleted 
                        ? `Completed on ${studentAssessment.testCompletionDate}`
                        : studentAssessment.status === 'approved' 
                        ? "Ready to complete" 
                        : "Awaiting approval"}
                    </p>
                  </div>
                  {studentAssessment.testCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : studentAssessment.status === 'approved' ? (
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No assessment history available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
