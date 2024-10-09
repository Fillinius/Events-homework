import { CreateUserSchema } from '@/shared/api'
import { procedure, router } from '../trpc'
import { prisma } from '../db'

export const userRouter = router({
  createUser: procedure.input(CreateUserSchema).mutation(({ input }) => {
    return prisma.user.create({
      data: input,
    })
  }),
})
