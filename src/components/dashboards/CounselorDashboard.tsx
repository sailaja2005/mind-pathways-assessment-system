
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, CheckCircle, Plus } from "lucide-react";
import CounselingForm from "@/components/forms/CounselingForm";

const CounselorDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [students] = useState([
    { id: 1, name: "John Doe", status: "Pending Assessment", lastUpdate: "2024-01-15" },
    { id: 2, name: "Jane Smith", status: "Assessment Complete", lastUpdate: "2024-01-14" },
    { id: 3, name: "Mike Johnson", status: "Test Approved", lastUpdate: "2024-01-13" },
  ]);

  if (showForm) {
    return <CounselingForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Counselor Dashboard</h2>
          <p className="text-gray-600">Manage student assessments and provide guidance</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-emerald-600" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">24</div>
            <p className="text-sm text-gray-600">Active assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">8</div>
            <p className="text-sm text-gray-600">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">16</div>
            <p className="text-sm text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Student Assessments</CardTitle>
          <CardDescription>Manage ongoing student evaluations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <h4 className="font-semibold">{student.name}</h4>
                  <p className="text-sm text-gray-600">Last updated: {student.lastUpdate}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === "Assessment Complete" 
                      ? "bg-green-100 text-green-800"
                      : student.status === "Test Approved"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {student.status}
                  </span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselorDashboard;
