import PatientsListPage from '@/pages/patients-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patients/')({
  component: PatientsListPage
})


