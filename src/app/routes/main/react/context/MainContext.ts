import { createContext } from 'react'

export interface MainContextModel {
    input: string
    setInput: (value: string) => void
}

const MainContext = createContext<null | MainContextModel>(null)

export default MainContext
