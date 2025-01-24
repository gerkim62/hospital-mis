import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/visits/$visitId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/visits/$visitId"!</div>
}
