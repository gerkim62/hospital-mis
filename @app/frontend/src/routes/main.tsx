import ReceptionPage from '@/pages/reception'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/main')({
  component:ReceptionPage,
})

