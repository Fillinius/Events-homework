import { CreateUserSchema } from '@/shared/api'
import { procedure, router } from '../trpc'
import { prisma } from '../db'

export const userRouter = router({
  createUser: procedure.input(CreateUserSchema).mutation(async ({ input }) => {
    const existUser = await prisma.user.findUnique({
      where: { email: input.email },
    })
    if (existUser) {
      throw new Error('User already exist')
    }
    return prisma.user.create({
      data: input,
    })
  }),
})
