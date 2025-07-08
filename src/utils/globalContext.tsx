import { createContext, useState } from 'react'

export const GlobalContext = createContext<any>('')

const AppContext = ({ children }: { children: any }) => {
  const [pathname, setPathname] = useState<string>('/')

  return (
    <GlobalContext.Provider
      value={{
        pathname,
        setPathname,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default AppContext
