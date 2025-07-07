
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Users, GraduationCap, Brain, FileText, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CounselorDashboard from "@/components/dashboards/CounselorDashboard";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import MentorDashboard from "@/components/dashboards/MentorDashboard";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRoleSelection = (role: string) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setIsLoggedIn(false);
  };

  if (isLoggedIn && currentRole) {
    return (
      <DashboardLayout currentRole={currentRole} onLogout={handleLogout}>
        {currentRole === "counselor" && <CounselorDashboard />}
        {currentRole === "student" && <StudentDashboard />}
        {currentRole === "mentor" && <MentorDashboard />}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 rounded-full p-4">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mind Pathways Assessment System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive platform for student counseling, personality assessment, and collaborative support between counselors, students, and mentors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleRoleSelection("counselor")}>
            <CardHeader className="text-center">
              <div className="bg-emerald-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <UserCheck className="h-10 w-10 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">Counselor Portal</CardTitle>
              <CardDescription>
                Assess students and provide professional guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-emerald-500" />
                  Complete student assessment forms
                </li>
                <li className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-emerald-500" />
                  Provide remarks and suggestions
                </li>
                <li className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-emerald-500" />
                  Approve personality tests
                </li>
              </ul>
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                Enter as Counselor
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleRoleSelection("student")}>
            <CardHeader className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <GraduationCap className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription>
                Take personality assessments and view results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-blue-500" />
                  Big Five Personality Test
                </li>
                <li className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                  View assessment results
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  Access counselor feedback
                </li>
              </ul>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Enter as Student
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleRoleSelection("mentor")}>
            <CardHeader className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Mentor Portal</CardTitle>
              <CardDescription>
                Monitor student progress and provide guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
                  View comprehensive profiles
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-purple-500" />
                  Access counselor assessments
                </li>
                <li className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-500" />
                  Support student development
                </li>
              </ul>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Enter as Mentor
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Secure, professional assessment platform designed for educational institutions</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
