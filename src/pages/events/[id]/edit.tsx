import { EditEventForm } from '@/features/edit-event'
import { CreateEventSchema, trpc } from '@/shared/api'
import { useRouter } from 'next/router'

export default function EditEvent() {
  const { query, push } = useRouter()

  const { mutate } = trpc.event.edit.useMutation({
    onSuccess: () => {
      push(`/events/${query.id}`)
    },
  })

  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(query.id),
  })

  if (isLoading) {
    return 'Loading...'
  }
  if (!data) {
    return 'No data'
  }
  const handleSubmit = (dataEdit: CreateEventSchema) => {
    mutate({
      ...dataEdit,
      id: Number(query.id),
    })
  }

  return <EditEventForm onSubmit={handleSubmit} {...data} />
}
