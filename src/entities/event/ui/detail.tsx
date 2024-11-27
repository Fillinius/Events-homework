import { RouterOutput } from '@/shared/api'
import { useRouter } from 'next/router'

type EventDetailProps = NonNullable<RouterOutput['event']['findUnique']>

export const EventDetail = ({
  title,
  description,
  date,
  participations,
  typeBtnEdit,
}: EventDetailProps) => {
  const router = useRouter()

  const handleChangeEvent = () => {
    router.push(`/events/${router.query.id}/edit`)
  }
  console.log(typeBtnEdit)

  return (
    <div className="m-5">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Информация о событии
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        {typeBtnEdit && (
          <button
            onClick={handleChangeEvent}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
          >
            Редактировать событие
          </button>
        )}
        <td className="divide-y divide-gray-100 ">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <tr className="text-sm font-medium leading-6 text-gray-900">
              Название
            </tr>
            <tr className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </tr>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <tr className="text-sm font-medium leading-6 text-gray-900">
              Описание
            </tr>
            <tr className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {description}
            </tr>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <tr className="text-sm font-medium leading-6 text-gray-900">
              Дата проведения
            </tr>
            <tr className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {date.toLocaleDateString()}
            </tr>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <tr className="text-sm font-medium leading-6 text-gray-900">
              Участники
            </tr>
            <tr className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {participations.map(({ user }) => user.name).join(', ')}
            </tr>
          </div>
        </td>
      </div>
      <button
        type="button"
        className="text-sm font-semibold leading-6 py-1 px-3 bg-red-500 hover:bg-red-700 text-white"
        onClick={() => router.push('/')}
      >
        Назад
      </button>
    </div>
  )
}
