import { useContext } from 'react'
import forceNonNullable from '../../../utils/forceNonNullable'
import MainContext from './context/MainContext'

export default function useMainContext() {
    return forceNonNullable(useContext(MainContext))
}
