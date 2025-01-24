import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Pencil, TestTube, User } from "lucide-react";
import { useState } from 'react';

const LabsList = () => {
  const [labs] = useState([
    { 
      id: 1, 
      title: "Blood Count", 
      description: "Complete blood count analysis",
      status: "pending",
      patientName: "John Doe",
      patientId: "P001",
      results: null
    },
    {
      id: 2,
      title: "Lipid Panel",
      description: "Cholesterol and triglycerides test",
      status: "in_progress",
      patientName: "Jane Smith",
      patientId: "P002",
      results: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700",
      in_progress: "bg-blue-100 text-blue-700",
      done: "bg-green-100 text-green-700"
    };
    return colors[status] || colors.pending;
  };

  const filteredLabs = labs.filter(lab => 
    lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Input
          placeholder="Search labs by title, patient name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLabs.map((lab) => (
          <Card key={lab.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TestTube className="h-5 w-5" />
                {lab.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                {lab.patientName} ({lab.patientId})
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-3">{lab.description}</p>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lab.status)}`}>
                {lab.status.replace('_', ' ').toUpperCase()}
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 p-4 flex gap-2">
              {lab.status === 'pending' && (
                <Button variant="outline" size="sm" className="flex-1">
                  <TestTube className="h-4 w-4 mr-2" />
                  Start Lab
                </Button>
              )}
              {lab.status === 'in_progress' && (
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Enter Results
                </Button>
              )}
              {lab.status === 'done' && (
                <Button variant="outline" size="sm" className="flex-1">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Results
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LabsList;