import { CreateUserForm } from '@/features/create-user'
import { CreateUserSchema, trpc } from '@/shared/api'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const { mutate } = trpc.user.createUser.useMutation({
    onSuccess: () => {
      router.push('/api/auth/signin')
    },
  })

  const handleSubmit = (data: CreateUserSchema) => {
    console.log(data)

    mutate(data)
  }

  return <CreateUserForm onSubmit={handleSubmit} />
}
