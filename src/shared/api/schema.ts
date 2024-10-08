import { z } from 'zod'

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional() || z.undefined,
  date: z.coerce.date() || z.string(),
})

export type CreateEventSchema = z.infer<typeof CreateEventSchema>

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
})
export const LeaveEventSchema = z.object({
  id: z.number().int().positive(),
})
