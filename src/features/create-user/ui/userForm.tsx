import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserSchema } from '@/shared/api'
import { useRouter } from 'next/router'

type CreateUserFormProps = {
  onSubmit: (data: CreateUserSchema) => void
}

export const CreateUserForm = ({ onSubmit }: CreateUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    mode: 'onChange',
  })

  const router = useRouter()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Регистрация нового пользователя
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Заполните форму регистрации
          </p>

          {/* Имя пользователя ////////////////////////*/}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Имя пользователя
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Ваш Email ///////////////////////////////////// */}
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ваш Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password /////////////////////////// */}
            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Придумайте пароль
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="mt-3 text-sm leading-6 text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => router.back()}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Создать
        </button>
      </div>
    </form>
  )
}
