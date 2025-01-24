import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FilePlus, FlaskConical, Pill, DollarSign, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PatientProfilePage = () => {
  const [visits, setVisits] = useState([
    {
      date: "2024-01-15T09:30:00",
      symptoms: "Fever, headache",
      diagnosis: "Viral infection",
      treatment: "Rest, fluids, acetaminophen",
      billingTotal: 150.0,
      status: "Completed",
      labResults: {
        name: "Complete Blood Count",
        description: "Routine blood work",
        status: "Completed",
        results: "Normal ranges",
      },
    },
  ]);

  const patient = {
    name: "Jane Smith",
    birthDate: "1985-01-18",
    patientId: "P1234567",
    totalVisits: 8,
    lastVisit: "2024-01-15T09:30:00",
    outstandingBalance: 450.75,
    insurance: "Blue Cross Blue Shield",
    nextAppointment: "2024-02-15T10:00:00",
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const addTreatmentFee = (visitIndex, amount = 50) => {
    setVisits(visits.map((visit, index) => {
      if (index === visitIndex) {
        return {
          ...visit,
          billingTotal: visit.billingTotal + amount
        };
      }
      return visit;
    }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header Section */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{patient.name}</CardTitle>
              <CardDescription className="mt-1">
                Patient ID: {patient.patientId} | Insurance: {patient.insurance}
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-4 py-2">
              <Calendar className="h-4 w-4 mr-2 inline" />
              Next Appointment: {new Date(patient.nextAppointment).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="text-lg">{new Date(patient.birthDate).toLocaleDateString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-lg">{calculateAge(patient.birthDate)} years</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-gray-500">Total Visits</p>
              <p className="text-lg">{patient.totalVisits}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-blue-600">Outstanding Balance</p>
              <p className="text-lg font-semibold text-blue-700">${patient.outstandingBalance}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Main Tabs Section */}
      <Tabs defaultValue="visits" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visits">Visits & Treatment</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Visits Tab */}
        <TabsContent value="visits">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>View and manage patient visits</CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FilePlus className="h-4 w-4 mr-2" />
                New Visit
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Symptoms</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map((visit, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(visit.date).toLocaleDateString()}</TableCell>
                      <TableCell>{visit.symptoms}</TableCell>
                      <TableCell>{visit.diagnosis}</TableCell>
                      <TableCell>{visit.treatment}</TableCell>
                      <TableCell className="font-medium">${visit.billingTotal}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          visit.status === "Completed" ? "bg-green-50 text-green-700" : ""
                        }>
                          {visit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addTreatmentFee(index)}
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                          >
                            <DollarSign className="h-4 w-4 mr-1" />
                            Add Fee
                          </Button>
                          <Button variant="outline" size="sm">
                            <FlaskConical className="h-4 w-4 mr-1" />
                            Labs
                          </Button>
                          <Button variant="outline" size="sm">
                            <Pill className="h-4 w-4 mr-1" />
                            Meds
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs">
          <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
              <CardDescription>View and manage laboratory results</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Lab results content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>View and manage billing details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Billing information will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfilePage;
