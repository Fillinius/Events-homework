import Link from 'next/link'

export type AuthBtnProp = {
  isAuth: boolean
}

export const AuthBtn = ({ isAuth }: AuthBtnProp) => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {!isAuth && (
        <Link
          href={'/register'}
          type="button"
          placeholder="Если зарегистрированны в системе, иначе зарегистрируйтесь"
          className="relative rounded-full bg-yellow-50 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
        >
          Зарегистрироваться
        </Link>
      )}
      <Link
        href={isAuth ? '/api/auth/signout' : '/api/auth/signin'}
        type="button"
        placeholder="Если зарегистрированны в системе, иначе зарегистрируйтесь"
        className="relative rounded-full bg-yellow-50 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:placeholder-shown:"
      >
        {isAuth ? 'Выйти' : 'Войти'}
      </Link>
    </div>
  )
}
