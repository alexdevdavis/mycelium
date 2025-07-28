import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$blogPostId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$blogPostId/edit"!</div>
}
