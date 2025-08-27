import { createContext, useState } from 'react'

export const GlobalContext = createContext<any>('')

const AppContext = ({ children }: { children: any }) => {
  const [pathname, setPathname] = useState<string>('/')
  const [isAddToCartDialogOpen, setIsAddToCartDialogOpen] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        pathname,
        setPathname,
        isAddToCartDialogOpen,
        setIsAddToCartDialogOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default AppContext
