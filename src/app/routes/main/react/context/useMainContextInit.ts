import { useState } from 'react'
import { MainContextModel } from './MainContext'

export default function useMainContextInit(): MainContextModel {
    const [input, setInput] = useState('')

    return { input, setInput }
}
