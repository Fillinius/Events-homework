import { trpc } from '@/shared/api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type JoinEventButtonProps = {
  eventId: number
  onSuccess?: () => void
}

export const JoinEventButton = ({
  eventId,
  onSuccess,
}: JoinEventButtonProps) => {
  const { mutate } = trpc.event.join.useMutation({ onSuccess })

  const session = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (session.data) {
      mutate({ id: eventId })
    } else {
      router.push('/api/auth/signin')
    }
  }

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-black text-white"
      onClick={handleClick}
    >
      Присоединиться
    </button>
  )
}
