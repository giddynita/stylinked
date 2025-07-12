import { createContext, useState } from 'react'
import type { CartItemType } from './types'

export const GlobalContext = createContext<any>('')

const AppContext = ({ children }: { children: any }) => {
  const [pathname, setPathname] = useState<string>('/')
  const [variantDialogOpen, setVariantDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CartItemType | null>(null)
  const [editQuantity, setEditQuantity] = useState(1)
  const [editSize, setEditSize] = useState('')
  const [editColor, setEditColor] = useState('')
  const [isAddToCartDialogOpen, setIsAddToCartDialogOpen] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        pathname,
        setPathname,
        variantDialogOpen,
        setVariantDialogOpen,
        selectedItem,
        setSelectedItem,
        editQuantity,
        setEditQuantity,
        editSize,
        setEditSize,
        editColor,
        setEditColor,
        isAddToCartDialogOpen,
        setIsAddToCartDialogOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default AppContext
