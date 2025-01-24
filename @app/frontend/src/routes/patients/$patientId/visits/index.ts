import PatientVisitsPage from "@/pages/patient-all-visits";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/patients/$patientId/visits/")({
  component: PatientVisitsPage,
});
