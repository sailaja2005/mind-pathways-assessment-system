
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, BarChart3, TrendingUp, Eye, CheckCircle, XCircle, Search, GraduationCap, Shield, Upload, FileSpreadsheet } from "lucide-react";
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [filterMentor, setFilterMentor] = useState<string>("all");
  const [students, setStudents] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load students with personality results
      const { data: studentsData, error: studentsError } = await supabase
        .from('students')
        .select(`
          *,
          personality_results(*)
        `);

      if (studentsError) throw studentsError;

      // Load mentors
      const { data: mentorsData, error: mentorsError } = await supabase
        .from('mentors')
        .select('*');

      if (mentorsError) throw mentorsError;

      setStudents(studentsData || []);
      setMentors(mentorsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load students and mentors data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Process the Excel data and insert into database
      const studentsToInsert = jsonData.map((row: any) => ({
        roll_number: row['Roll Number'] || row['roll_number'],
        age: row['Age'] || row['age']?.toString(),
        gender: row['Gender'] || row['gender'],
        education: row['Education'] || row['education'],
        address: row['Address'] || row['address'],
        mobile: row['Mobile'] || row['mobile'],
        mentor_name: row['Mentor Name'] || row['mentor_name'],
        academic_year: parseInt(row['Academic Year'] || row['academic_year']) || 1
      }));

      const { error } = await supabase
        .from('students')
        .insert(studentsToInsert);

      if (error) throw error;

      toast({
        title: "Upload Successful",
        description: `Successfully uploaded ${studentsToInsert.length} students.`,
      });

      loadData(); // Reload data
      setShowUpload(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload student data. Please check the file format.",
        variant: "destructive"
      });
    }
  };


  const handleViewAnalysis = (student: any) => {
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const hasResults = student.personality_results && student.personality_results.length > 0;
    
    const matchesSearch = (student.roll_number || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (student.mentor_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "completed" && hasResults) ||
                         (filterStatus === "pending" && !hasResults);
    
    const matchesYear = filterYear === "all" || student.academic_year?.toString() === filterYear;
    
    const matchesMentor = filterMentor === "all" || student.mentor_name === filterMentor;
    
    return matchesSearch && matchesStatus && matchesYear && matchesMentor;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const completedTests = students.filter(s => s.personality_results && s.personality_results.length > 0).length;
  const pendingTests = totalStudents - completedTests;
  const completionRate = totalStudents > 0 ? Math.round((completedTests / totalStudents) * 100) : 0;

  // If viewing student analysis
  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Student Analysis</h2>
            <p className="text-gray-600">Roll: {selectedStudent.roll_number}</p>
            <p className="text-sm text-gray-500">Mentor: {selectedStudent.mentor_name}</p>
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
              {selectedStudent.personality_results && selectedStudent.personality_results.length > 0 ? (
                <div className="space-y-4">
                  {[
                    { name: 'Openness', score: selectedStudent.personality_results[0].openness_score },
                    { name: 'Conscientiousness', score: selectedStudent.personality_results[0].conscientiousness_score },
                    { name: 'Extraversion', score: selectedStudent.personality_results[0].extraversion_score },
                    { name: 'Agreeableness', score: selectedStudent.personality_results[0].agreeableness_score },
                    { name: 'Neuroticism', score: selectedStudent.personality_results[0].neuroticism_score }
                  ].map(({ name, score }) => (
                    <div key={name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-sm font-bold">{Number(score).toFixed(1)}/5</span>
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
              ) : (
                <p className="text-gray-500">No test results available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700">Assessment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm">Test Completion Date</h4>
                <p className="text-sm text-gray-600">
                  {selectedStudent.personality_results?.[0]?.completed_at 
                    ? new Date(selectedStudent.personality_results[0].completed_at).toLocaleDateString()
                    : 'Not completed'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Student Information</h4>
                <div className="bg-emerald-50 p-3 rounded-lg mt-2 space-y-1">
                  <p className="text-sm text-gray-700">Age: {selectedStudent.age || 'N/A'}</p>
                  <p className="text-sm text-gray-700">Gender: {selectedStudent.gender || 'N/A'}</p>
                  <p className="text-sm text-gray-700">Education: {selectedStudent.education || 'N/A'}</p>
                  <p className="text-sm text-gray-700">Academic Year: {selectedStudent.academic_year || 'N/A'}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Assigned Mentor</h4>
                <p className="text-sm text-gray-600">{selectedStudent.mentor_name || 'Not assigned'}</p>
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
              {selectedStudent.personality_results?.[0]?.analysis_text?.map((analysis: string, index: number) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{analysis}</p>
                </div>
              )) || (
                <p className="text-gray-500">No analysis available</p>
              )}
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

      {/* Excel Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Student Data Management
          </CardTitle>
          <CardDescription>Upload student data via Excel file or manage existing students</CardDescription>
        </CardHeader>
        <CardContent>
          {!showUpload ? (
            <Button onClick={() => setShowUpload(true)} className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Upload Student Data (Excel)
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="excel-upload">Upload Excel File</Label>
                <p className="text-sm text-gray-600 mb-2">
                  Excel file should contain columns: Roll Number, Age, Gender, Education, Address, Mobile, Mentor Name, Academic Year
                </p>
                <Input
                  id="excel-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowUpload(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search by roll number or mentor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div>
              <select
                value={filterMentor}
                onChange={(e) => setFilterMentor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Mentors</option>
                {Array.from(new Set(students.map(s => s.mentor_name).filter(Boolean))).map(mentor => (
                  <option key={mentor} value={mentor}>{mentor}</option>
                ))}
              </select>
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
          {loading ? (
            <div className="text-center py-8">
              <p>Loading students...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => {
                const hasResults = student.personality_results && student.personality_results.length > 0;
                return (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Roll: {student.roll_number}</h3>
                        <p className="text-sm text-gray-600">Year: {student.academic_year || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.mentor_name || 'No Mentor'}</p>
                        <p className="text-xs text-gray-500">{student.education || 'N/A'}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {hasResults ? (
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
                              View Results
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
                );
              })}
              {filteredStudents.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <p>No students found matching the current filters.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
