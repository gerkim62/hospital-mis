"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCurrentPatient from "@/hooks/useCurrentPatient";
import { Route } from "@/routes/patients/$patientId/visits";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  PlusCircle,
  UserRound,
} from "lucide-react";
import { useState } from "react";

const PatientVisitsPage = () => {
  // Sample patient visits data
  const [visits] = useState([
    {
      id: "V001",
      patientId: "P12345",
      patientName: "Emily Rodriguez",
      arrivalTime: "2024-01-15T09:30:00",
      leaveTime: "2024-01-15T11:45:00",
      reason: "Annual checkup",
    },
    {
      id: "V002",
      patientId: "P12345",
      patientName: "Emily Rodriguez",
      arrivalTime: "2024-02-20T14:15:00",
      leaveTime: null,
      reason: "Follow-up consultation",
    },
  ]);

  const { patientId } = Route.useParams();

  const { patient } = useCurrentPatient(Number(patientId));

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewMore = (visitId) => {
    console.log(`Viewing details for visit ${visitId}`);
    // Implement view more logic
  };

  const handleNewVisit = () => {
    console.log("Creating a new visit");
    // Implement new visit logic
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <UserRound className="h-6 w-6 text-blue-600" />
                {patient ? patient.name : "N/A"}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                Patient ID: {patient ? patient.id : (patientId ?? "N/A")}
              </CardDescription>
            </div>
            <Link
              disabled={!patientId && !patient}
              to="/patients/$patientId/visits/new"
              params={{
                patientId: patient ? patient.id.toString() : (patientId ?? ""),
              }}
            >
              <Button
                onClick={handleNewVisit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Visit
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-gray-200">
          {visits.map((visit) => (
            <div
              key={visit.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <CalendarDays className="h-4 w-4 text-blue-500" />
                    <span>
                      {formatDateTime(visit.arrivalTime).split(",")[0]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-gray-700">
                        Arrival:{" "}
                        {formatDateTime(visit.arrivalTime).split(",")[1].trim()}
                      </span>
                    </div>
                    {visit.leaveTime && (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-gray-600">
                          Departure:{" "}
                          {formatDateTime(visit.leaveTime).split(",")[1].trim()}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Reason: {visit.reason}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewMore(visit.id)}
                  className="mt-2"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientVisitsPage;
