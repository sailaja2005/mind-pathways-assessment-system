import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, TrendingUp, Eye, CheckCircle, XCircle, User, Search } from "lucide-react";

// Dummy data for 20 mentors and 400 students
const generateMentorData = () => {
  const mentors = [];
  const students = [];
  
  // Generate 20 mentors
  for (let i = 1; i <= 20; i++) {
    mentors.push({
      id: `M${i.toString().padStart(3, '0')}`,
      name: `Dr. Mentor ${i}`,
      department: i <= 5 ? 'Computer Science' : i <= 10 ? 'Mathematics' : i <= 15 ? 'Physics' : 'Chemistry'
    });
  }
  
  // Generate 400 students (20 students per mentor)
  for (let mentorIndex = 0; mentorIndex < 20; mentorIndex++) {
    for (let studentIndex = 1; studentIndex <= 20; studentIndex++) {
      const studentId = mentorIndex * 20 + studentIndex;
      const isTestCompleted = Math.random() > 0.3; // 70% completion rate
      
      students.push({
        id: `S${studentId.toString().padStart(3, '0')}`,
        rollNumber: `2024${studentId.toString().padStart(3, '0')}`,
        name: `Student ${studentId}`,
        mentorId: mentors[mentorIndex].id,
        testCompleted: isTestCompleted,
        testCompletionDate: isTestCompleted ? `2024-01-${Math.floor(Math.random() * 28) + 1}` : null,
        personalityScores: isTestCompleted ? {
          openness: Math.round((Math.random() * 2 + 3) * 10) / 10,
          conscientiousness: Math.round((Math.random() * 2 + 3) * 10) / 10,
          extraversion: Math.round((Math.random() * 2 + 3) * 10) / 10,
          agreeableness: Math.round((Math.random() * 2 + 3) * 10) / 10,
          neuroticism: Math.round((Math.random() * 2 + 1) * 10) / 10
        } : null,
        counselorRemarks: isTestCompleted ? [
          "Excellent academic performance with strong analytical skills.",
          "Shows leadership potential and excellent teamwork skills.",
          "Demonstrates creativity and innovative thinking.",
          "Strong communication skills and collaborative approach.",
          "Highly motivated with consistent performance.",
          "Shows empathy and good interpersonal relationships."
        ][Math.floor(Math.random() * 6)] : null
      });
    }
  }
  
  return { mentors, students };
};

const { mentors, students } = generateMentorData();

const EnhancedMentorDashboard = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [mentorInput, setMentorInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const handleMentorSearch = () => {
    const mentor = mentors.find(m => 
      m.id.toLowerCase() === mentorInput.toLowerCase() || 
      m.name.toLowerCase().includes(mentorInput.toLowerCase())
    );
    setSelectedMentor(mentor);
    setSelectedStudent(null);
  };

  const getStudentsForMentor = (mentorId: string) => {
    return students.filter(s => s.mentorId === mentorId);
  };

  const handleViewResults = (student: any) => {
    setSelectedStudent(student);
  };

  const handleBackToStudents = () => {
    setSelectedStudent(null);
  };

  const handleBackToLogin = () => {
    setSelectedMentor(null);
    setSelectedStudent(null);
    setMentorInput("");
  };

  // If viewing student results
  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Test Results</h2>
            <p className="text-gray-600">{selectedStudent.name} - {selectedStudent.rollNumber}</p>
          </div>
          <Button variant="outline" onClick={handleBackToStudents}>
            Back to Students
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Personality Assessment Results</CardTitle>
              <CardDescription>Big Five Personality Traits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(selectedStudent.personalityScores).map(([trait, score]) => (
                  <div key={trait} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">{trait}</span>
                      <span className="text-sm font-bold">{Number(score)}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${(Number(score) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700">Assessment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Test Completion Date</Label>
                <p className="text-sm text-gray-600">{selectedStudent.testCompletionDate}</p>
              </div>
              <div>
                <Label className="font-semibold">Counselor Remarks</Label>
                <div className="bg-emerald-50 p-3 rounded-lg mt-2">
                  <p className="text-sm text-gray-700">{selectedStudent.counselorRemarks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If mentor is selected, show their students
  if (selectedMentor) {
    const mentorStudents = getStudentsForMentor(selectedMentor.id);
    const completedTests = mentorStudents.filter(s => s.testCompleted).length;
    const completionRate = Math.round((completedTests / mentorStudents.length) * 100);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome, {selectedMentor.name}</h2>
            <p className="text-gray-600">{selectedMentor.department} Department • {mentorStudents.length} Students Assigned</p>
          </div>
          <Button variant="outline" onClick={handleBackToLogin}>
            Switch Mentor
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{mentorStudents.length}</div>
              <p className="text-sm text-gray-600">Under your supervision</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Tests Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{completedTests}</div>
              <p className="text-sm text-gray-600">Out of {mentorStudents.length} students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completionRate}%</div>
              <p className="text-sm text-gray-600">Overall progress</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Students</CardTitle>
            <CardDescription>Monitor psychometric test completion and view results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mentorStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 rounded-full p-2">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">Roll Number: {student.rollNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {student.testCompleted ? (
                      <>
                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Test Completed
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleViewResults(student)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Results
                        </Button>
                      </>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                        <XCircle className="h-3 w-3 mr-1" />
                        Test Pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default mentor login view
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mentor Portal</h2>
        <p className="text-gray-600">Enter your details to access your student dashboard</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2 text-purple-600" />
            Mentor Authentication
          </CardTitle>
          <CardDescription>
            Enter your mentor ID or name to access your students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mentorInput">Mentor ID or Name</Label>
            <Input
              id="mentorInput"
              placeholder="e.g., M001 or Dr. Mentor 1"
              value={mentorInput}
              onChange={(e) => setMentorInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMentorSearch()}
            />
          </div>
          <Button 
            onClick={handleMentorSearch} 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!mentorInput.trim()}
          >
            <Search className="h-4 w-4 mr-2" />
            Access Dashboard
          </Button>
          
          {mentorInput && !selectedMentor && (
            <p className="text-sm text-red-600 text-center">
              Mentor not found. Please check your ID or name.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Available Mentors</CardTitle>
          <CardDescription className="text-center">
            Quick reference for mentor IDs and names
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {mentors.slice(0, 10).map((mentor) => (
              <div key={mentor.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                <span className="font-medium">{mentor.id}</span>
                <span className="text-gray-600">{mentor.name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Showing first 10 mentors. Total: {mentors.length} mentors available.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedMentorDashboard;