import { EditEventForm } from '@/features/edit-event'
import { CreateEventSchema, trpc } from '@/shared/api'
import { useRouter } from 'next/router'

export default function EditEvent() {
  const { query, back } = useRouter()

  const { mutate } = trpc.event.edit.useMutation({
    onSuccess: () => {
      back
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
  console.log(data)

  const handleSubmit = (dataEdit: CreateEventSchema) => {
    console.log('click', dataEdit)
    mutate({
      ...dataEdit,
      id: Number(query.id),
    })
  }

  return <EditEventForm onSubmit={handleSubmit} {...data} />
}
