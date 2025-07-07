
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, TrendingUp, Eye, CheckCircle, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    // Get all submitted assessments from localStorage
    const assessments = JSON.parse(localStorage.getItem('submittedAssessments') || '[]');
    setStudents(assessments);
  }, []);

  const handleViewMore = (student: any) => {
    setSelectedStudent(student);
  };

  const handleBackToTable = () => {
    setSelectedStudent(null);
  };

  const handleApprovalToggle = (studentIndex: number) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].status = updatedStudents[studentIndex].status === 'approved' ? 'pending' : 'approved';
    updatedStudents[studentIndex].approved = updatedStudents[studentIndex].status === 'approved';
    
    setStudents(updatedStudents);
    localStorage.setItem('submittedAssessments', JSON.stringify(updatedStudents));
  };

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Student Details</h2>
            <p className="text-gray-600">Comprehensive view of {selectedStudent.studentName}</p>
          </div>
          <Button variant="outline" onClick={handleBackToTable}>
            Back to Table
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{selectedStudent.studentName}</CardTitle>
            <CardDescription>Roll No: {selectedStudent.rollNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Assessment Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Submission Date:</span> {selectedStudent.submissionDate}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedStudent.testCompleted ? 'bg-green-100 text-green-800' : 
                      selectedStudent.status === 'approved' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedStudent.testCompleted ? 'Test Completed' : 
                       selectedStudent.status === 'approved' ? 'Test Approved' : 'Assessment Complete'}
                    </span>
                  </p>
                  {selectedStudent.testCompletionDate && (
                    <p><span className="font-medium">Test Completion:</span> {selectedStudent.testCompletionDate}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-emerald-700">Counselor Remarks</h4>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {selectedStudent.counselorRemarks || "Assessment completed successfully. Student shows good potential."}
                  </p>
                </div>
              </div>
            </div>

            {selectedStudent.personalityScores && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-purple-700">Personality Test Results</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(selectedStudent.personalityScores).map(([trait, score]) => (
                    <div key={trait} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm capitalize font-medium">{trait}:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(Number(score) / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{String(score)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedStudent.personalityAnalysis && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-blue-700">Personality Analysis</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {selectedStudent.personalityAnalysis.map((analysis: string, index: number) => (
                      <li key={index} className="text-sm text-gray-700">• {analysis}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600">Monitor student progress and manage assessments</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{students.length}</div>
            <p className="text-sm text-gray-600">Registered students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
              Tests Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {students.filter(s => s.status === 'approved').length}
            </div>
            <p className="text-sm text-gray-600">Ready for testing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Tests Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {students.filter(s => s.testCompleted).length}
            </div>
            <p className="text-sm text-gray-600">Assessments finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Clock className="h-5 w-5 mr-2 text-amber-600" />
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">
              {students.filter(s => s.status !== 'approved' && !s.testCompleted).length}
            </div>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Overview of all registered students and their assessment status</CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No students registered yet</p>
              <p className="text-sm">Students will appear here once counselors submit assessments</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead>Test Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{student.studentName}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.submissionDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {student.status === 'approved' ? 'Approved' : 'Pending'}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprovalToggle(index)}
                          className="text-xs"
                        >
                          {student.status === 'approved' ? 'Revoke' : 'Approve'}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.testCompleted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.testCompleted ? 'Completed' : 'Not Started'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewMore(student)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View More
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
