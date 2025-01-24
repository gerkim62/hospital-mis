import PatientVisitSummaryPage from "@/pages/patient-visit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/patients/$patientId/visits/$visitId")({
  component: PatientVisitSummaryPage,
});
