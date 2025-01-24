import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UserRound, 
  Clock, 
  CalendarDays, 
  ArrowRight 
} from "lucide-react";

const PatientVisitsPage = () => {
  // Sample patient visits data
  const [visits] = useState([
    {
      id: "V001",
      patientId: "P12345",
      patientName: "Emily Rodriguez",
      arrivalTime: "2024-01-15T09:30:00",
      leaveTime: "2024-01-15T11:45:00",
      reason: "Annual checkup"
    },
    {
      id: "V002",
      patientId: "P12345",
      patientName: "Emily Rodriguez",
      arrivalTime: "2024-02-20T14:15:00",
      leaveTime: null,
      reason: "Follow-up consultation"
    }
  ]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewMore = (visitId) => {
    console.log(`Viewing details for visit ${visitId}`);
    // Implement view more logic
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="w-full">
        <CardHeader className="bg-gray-100">
          <CardTitle className="flex items-center gap-2">
            <UserRound className="h-6 w-6 text-blue-600" />
            {visits[0].patientName} - Visits
            <span className="ml-2 text-sm text-gray-600">
              Patient ID: {visits[0].patientId}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {visits.map((visit) => (
            <div 
              key={visit.id} 
              className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <CalendarDays className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">
                      Arrival: {formatDateTime(visit.arrivalTime)}
                    </span>
                  </div>
                  {visit.leaveTime && (
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        Departure: {formatDateTime(visit.leaveTime)}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Reason: {visit.reason}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewMore(visit.id)}
              >
                View More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientVisitsPage;