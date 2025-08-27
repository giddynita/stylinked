import { createContext, useState } from 'react'

type RedirectPathState = {
  pathname: string
  setPathname: (path: string) => void
}

const initialState: RedirectPathState = {
  pathname: '',
  setPathname: () => null,
}

export const RedirectPathContext =
  createContext<RedirectPathState>(initialState)

const RedirectPath = ({ children }: { children: React.ReactNode }) => {
  const [pathname, setPathname] = useState('/')

  return (
    <RedirectPathContext.Provider
      value={{
        pathname,
        setPathname,
      }}
    >
      {children}
    </RedirectPathContext.Provider>
  )
}
export default RedirectPath
