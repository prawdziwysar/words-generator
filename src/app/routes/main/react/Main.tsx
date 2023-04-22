import React from 'react'
import { Container } from '@mui/material'
import MainContext from './context/MainContext'
import useMainContextInit from './context/useMainContextInit'
import Input from './input/react/Input'
import Title from './title/react/Title'
import Words from './words/react/Words'

export default function Main() {
    const value = useMainContextInit()

    return (
        <MainContext.Provider value={value}>
            <Container>
                <Title />
                <Input />
                <Words />
            </Container>
        </MainContext.Provider>
    )
}
