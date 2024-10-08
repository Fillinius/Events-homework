import {
  CreateEventSchema,
  JoinEventSchema,
  LeaveEventSchema,
} from '@/shared/api'
import { prisma } from '../db'
import { isAuth, procedure, router } from '../trpc'
import { z } from 'zod'

export const eventRouter = router({
  findMany: procedure.query(async ({ ctx: { user } }) => {
    const events = await prisma.event.findMany({
      include: {
        participations: true,
      },
    })

    return events.map(({ participations, ...event }) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id),
    }))
  }),

  leave: procedure
    .input(LeaveEventSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx: { user } }) => {
      return prisma.participation.delete({
        where: { userId_eventId: { userId: user.id, eventId: input.id } },
      })
    }),
  edit: procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        date: z.coerce.date() || z.string(),
      })
    )
    .use(isAuth)
    .mutation(({ input }) => {
      return prisma.event.update({
        where: { id: input.id },
        data: {
          date: input.date,
          description: input.description,
          title: input.title,
        },
      })
    }),

  findUnique: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .use(isAuth)
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: input,
        // include: { author: true, participations: true },
        select: {
          title: true,
          description: true,
          date: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
    }),

  create: procedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.event.create({
        data: {
          authorId: user.id,
          ...input,
        },
      })
    }),

  join: procedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      })
    }),
})
