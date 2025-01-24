import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Download, FileText, Pill, UserRound } from "lucide-react";

const PatientDetailsPage = () => {
  // Sample patient data
  const patient = {
    id: "P12345",
    name: "Emily Rodriguez",
    drugs: [
      { 
        name: "Amoxicillin", 
        description: "Antibiotic for bacterial infections", 
        price: 25.50, 
        status: "prescribed" 
      },
      { 
        name: "Ibuprofen", 
        description: "Pain relief and anti-inflammatory", 
        price: 12.75, 
        status: "dispensed" 
      }
    ],
    expenses: [
      {
        name: "Consultation",
        description: "Initial medical consultation",
        amount: 150.00
      },
      {
        name: "Lab Tests",
        description: "Blood work and comprehensive panel",
        amount: 275.50
      }
    ]
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Patient Header */}
        <div className="bg-gray-100 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserRound className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
              <p className="text-gray-600">Patient ID: {patient.id}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              console.log('Downloading patient receipt');
              // Implement receipt download logic
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </div>

        {/* Medications Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Pill className="h-6 w-6 mr-2 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Medications</h2>
            </div>
            <Button variant="outline" size="sm">
              + New
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {patient.drugs.map((drug, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {drug.name}
                    <Badge 
                      variant={drug.status === "prescribed" ? "secondary" : "default"}
                      className="uppercase"
                    >
                      {drug.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{drug.description}</p>
                  {drug.status === "dispensed" && (
                    <div className="flex items-center text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${drug.price.toFixed(2)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Expenses Section */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Expenses</h2>
            </div>
            <Button variant="outline" size="sm">
              + New
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {patient.expenses.map((expense, index) => (
              <Card key={index} className="shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-800">{expense.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{expense.description}</p>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${expense.amount.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;