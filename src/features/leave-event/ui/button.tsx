import { trpc } from '@/shared/api'
import { log } from 'node:console'

type LeaveEventButtonProps = {
  eventId: number
  onSuccess?: () => void
}

export const LeaveEventButton = ({
  eventId,
  onSuccess,
}: LeaveEventButtonProps) => {
  const { mutate } = trpc.event.leave.useMutation({ onSuccess })
  const handleClick = () => {
    console.log('leave')

    mutate({ eventId: eventId })
  }

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-red-500 text-white"
      onClick={handleClick}
    >
      Покинуть
    </button>
  )
}
