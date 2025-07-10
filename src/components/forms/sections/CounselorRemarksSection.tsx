
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionProps } from "../types/counselingFormTypes";

const CounselorRemarksSection = ({ formData, onInputChange }: SectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-emerald-700">7) Counselor's Remarks and Recommendation</h3>
      
      <div>
        <Label htmlFor="counselorRemarks">Final Assessment and Recommendations</Label>
        <Textarea
          id="counselorRemarks"
          value={formData.counselorRemarks}
          onChange={(e) => onInputChange("counselorRemarks", e.target.value)}
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
            onCheckedChange={(checked) => onInputChange("approved", checked as boolean)}
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
};

export default CounselorRemarksSection;
