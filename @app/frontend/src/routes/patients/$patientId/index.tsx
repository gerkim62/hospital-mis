import PatientProfilePage from '@/pages/patient-profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patients/$patientId/')({
  component: PatientProfilePage,
})
