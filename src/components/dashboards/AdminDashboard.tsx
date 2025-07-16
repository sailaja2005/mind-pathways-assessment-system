
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, TrendingUp, Eye, CheckCircle, XCircle, Search, GraduationCap, Shield } from "lucide-react";

// Using the same dummy data generation logic as EnhancedMentorDashboard
const generateAdminData = () => {
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
        mentorName: mentors[mentorIndex].name,
        department: mentors[mentorIndex].department,
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
          "Shows empathy and good interpersonal relationships.",
          "Needs improvement in time management skills.",
          "Strong problem-solving abilities and logical thinking.",
          "Excellent team player with good social skills.",
          "Shows potential for leadership roles in future."
        ][Math.floor(Math.random() * 10)] : null,
        analysisText: isTestCompleted ? [
          "High openness indicates creativity and willingness to try new experiences.",
          "Strong conscientiousness suggests good organizational and planning skills.",
          "Moderate extraversion shows balanced social interaction preferences.",
          "High agreeableness indicates cooperative and trusting nature.",
          "Low neuroticism suggests emotional stability and resilience."
        ] : null
      });
    }
  }
  
  return { mentors, students };
};

const { mentors, students } = generateAdminData();

const AdminDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");

  const handleViewAnalysis = (student: any) => {
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.mentorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "completed" && student.testCompleted) ||
                         (filterStatus === "pending" && !student.testCompleted);
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const completedTests = students.filter(s => s.testCompleted).length;
  const pendingTests = totalStudents - completedTests;
  const completionRate = Math.round((completedTests / totalStudents) * 100);

  // If viewing student analysis
  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Student Analysis</h2>
            <p className="text-gray-600">{selectedStudent.name} - {selectedStudent.rollNumber}</p>
            <p className="text-sm text-gray-500">Mentor: {selectedStudent.mentorName} | {selectedStudent.department}</p>
          </div>
          <Button variant="outline" onClick={handleBackToList}>
            Back to Student List
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Personality Assessment Results</CardTitle>
              <CardDescription>Big Five Personality Traits Analysis</CardDescription>
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
                <h4 className="font-semibold text-sm">Test Completion Date</h4>
                <p className="text-sm text-gray-600">{selectedStudent.testCompletionDate}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Counselor Remarks</h4>
                <div className="bg-emerald-50 p-3 rounded-lg mt-2">
                  <p className="text-sm text-gray-700">{selectedStudent.counselorRemarks}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Assigned Mentor</h4>
                <p className="text-sm text-gray-600">{selectedStudent.mentorName}</p>
                <p className="text-xs text-gray-500">{selectedStudent.department} Department</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-700">Detailed Analysis</CardTitle>
            <CardDescription>Comprehensive personality insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedStudent.analysisText?.map((analysis: string, index: number) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{analysis}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main admin dashboard view
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600">Comprehensive overview of all students and their assessments</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalStudents}</div>
            <p className="text-sm text-gray-600">Across all mentors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Tests Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedTests}</div>
            <p className="text-sm text-gray-600">Ready for analysis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <XCircle className="h-5 w-5 mr-2 text-red-600" />
              Tests Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{pendingTests}</div>
            <p className="text-sm text-gray-600">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
            <p className="text-sm text-gray-600">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by student name, roll number, or mentor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                onClick={() => setFilterStatus("completed")}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>All Students ({filteredStudents.length})</CardTitle>
          <CardDescription>Complete student roster with mentor assignments and test status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.mentorName}</p>
                    <p className="text-xs text-gray-500">{student.department}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {student.testCompleted ? (
                      <>
                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleViewAnalysis(student)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View More
                        </Button>
                      </>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                        <XCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
