import { EventCard } from '@/entities/event'
import { JoinEventButton } from '@/features/join-event'
import { trpc } from '@/shared/api'
import { NavBar } from '@/widget/navbar'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Home() {
  const { data, refetch } = trpc.event.findMany.useQuery()
  const session = useSession()

  return (
    <>
      <NavBar type={session.status} user={session.data?.user.name} />
      <ul>
        {data?.map((event) => (
          <li key={event.id} className="mb-6">
            <EventCard
              {...event}
              action={
                !event.isJoined && (
                  <JoinEventButton eventId={event.id} onSuccess={refetch} />
                )
              }
            />
          </li>
        ))}
      </ul>
    </>
  )
}
