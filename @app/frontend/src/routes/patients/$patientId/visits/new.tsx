import NewPatientVisitPage from "@/pages/new-patient-visit";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/patients/$patientId/visits/new")({
  component: NewPatientVisitPage,
});
