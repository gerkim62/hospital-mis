import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Download, FlaskConical, User, DollarSign, TestTube } from "lucide-react";
import { useState } from 'react';

const PatientsPage = () => {
  // Sample data - replace with your actual data source
  const [patients] = useState([
    { id: 1, number: "P001", name: "John Doe", inPremise: true, pendingLabs: true, leftDate: null },
    { id: 2, number: "P002", name: "Jane Smith", inPremise: false, pendingLabs: false, leftDate: "2024-01-15" },
    // Add more sample data as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showInPremise, setShowInPremise] = useState(false);
  const [showPendingLabs, setShowPendingLabs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const ITEMS_PER_PAGE = 6;

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInPremise = !showInPremise || patient.inPremise;
    const matchesPendingLabs = !showPendingLabs || patient.pendingLabs;
    return matchesSearch && matchesInPremise && matchesPendingLabs;
  });

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

  const handleDownloadInvoice = (patientId) => {
    console.log(`Downloading invoice for patient ${patientId}`);
    // Implement invoice download logic
  };

  const handleExpenses = (patientId) => {
    console.log(`Viewing expenses for patient ${patientId}`);
    // Implement expenses view logic
  };

  const handleLabs = (patientId) => {
    console.log(`Viewing labs for patient ${patientId}`);
    // Implement labs view logic
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={showInPremise}
              onCheckedChange={setShowInPremise}
            />
            <span>In Premise Only</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={showPendingLabs}
              onCheckedChange={setShowPendingLabs}
            />
            <span>Pending Labs Only</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPatients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {patient.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Patient #: {patient.number}</p>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${patient.inPremise ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">
                    {patient.inPremise ? 'In Premise' : `Left: ${patient.leftDate}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FlaskConical className={`h-4 w-4 ${patient.pendingLabs ? 'text-amber-500' : 'text-green-500'}`} />
                  <span className="text-sm">
                    {patient.pendingLabs ? 'Pending Labs' : 'No Pending Labs'}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="col-span-1"
                  onClick={() => handleDownloadInvoice(patient.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Invoice
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="col-span-1"
                  onClick={() => handleExpenses(patient.id)}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Expenses
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="col-span-1"
                  onClick={() => handleLabs(patient.id)}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Labs
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                size="sm"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;