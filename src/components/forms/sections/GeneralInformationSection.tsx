
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SectionProps } from "../types/counselingFormTypes";

const GeneralInformationSection = ({ formData, onInputChange }: SectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-emerald-700">1) General Information</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="studentName">Name of the Student *</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) => onInputChange("studentName", e.target.value)}
            className="mt-1"
            placeholder="e.g., Neha Alpani"
          />
        </div>
        <div>
          <Label htmlFor="rollNumber">Roll Number *</Label>
          <Input
            id="rollNumber"
            value={formData.rollNumber}
            onChange={(e) => onInputChange("rollNumber", e.target.value)}
            className="mt-1"
            placeholder="e.g., 2024001"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>Gender *</Label>
        <RadioGroup
          value={formData.gender}
          onValueChange={(value) => onInputChange("gender", value)}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="address">Address for Communication *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange("address", e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="education">Education *</Label>
        <Input
          id="education"
          value={formData.education}
          onChange={(e) => onInputChange("education", e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="fatherName">Father's Name</Label>
          <Input
            id="fatherName"
            value={formData.fatherName}
            onChange={(e) => onInputChange("fatherName", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="motherName">Mother's Name</Label>
          <Input
            id="motherName"
            value={formData.motherName}
            onChange={(e) => onInputChange("motherName", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="guardianName">Name of the Guardian (if applicable)</Label>
          <Input
            id="guardianName"
            value={formData.guardianName}
            onChange={(e) => onInputChange("guardianName", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="fatherOccupation">Occupation (Father)</Label>
          <Input
            id="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={(e) => onInputChange("fatherOccupation", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="motherOccupation">Occupation (Mother)</Label>
          <Input
            id="motherOccupation"
            value={formData.motherOccupation}
            onChange={(e) => onInputChange("motherOccupation", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="guardianOccupation">Occupation (Guardian)</Label>
          <Input
            id="guardianOccupation"
            value={formData.guardianOccupation}
            onChange={(e) => onInputChange("guardianOccupation", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>Social Economic Status</Label>
        <RadioGroup
          value={formData.socioEconomicStatus}
          onValueChange={(value) => onInputChange("socioEconomicStatus", value)}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ug" id="ug" />
            <Label htmlFor="ug">UG</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pg" id="pg" />
            <Label htmlFor="pg">PG</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="graduate" id="graduate" />
            <Label htmlFor="graduate">Graduate</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Mobile Number</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="studentMobile">Student</Label>
            <Input
              id="studentMobile"
              value={formData.studentMobile}
              onChange={(e) => onInputChange("studentMobile", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="fatherMobile">Father</Label>
            <Input
              id="fatherMobile"
              value={formData.fatherMobile}
              onChange={(e) => onInputChange("fatherMobile", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="motherMobile">Mother</Label>
            <Input
              id="motherMobile"
              value={formData.motherMobile}
              onChange={(e) => onInputChange("motherMobile", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="guardianMobile">Guardian</Label>
            <Input
              id="guardianMobile"
              value={formData.guardianMobile}
              onChange={(e) => onInputChange("guardianMobile", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Email ID</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="studentEmail">Student</Label>
            <Input
              id="studentEmail"
              type="email"
              value={formData.studentEmail}
              onChange={(e) => onInputChange("studentEmail", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="fatherEmail">Father</Label>
            <Input
              id="fatherEmail"
              type="email"
              value={formData.fatherEmail}
              onChange={(e) => onInputChange("fatherEmail", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="motherEmail">Mother</Label>
            <Input
              id="motherEmail"
              type="email"
              value={formData.motherEmail}
              onChange={(e) => onInputChange("motherEmail", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="guardianEmail">Guardian</Label>
            <Input
              id="guardianEmail"
              type="email"
              value={formData.guardianEmail}
              onChange={(e) => onInputChange("guardianEmail", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationSection;
