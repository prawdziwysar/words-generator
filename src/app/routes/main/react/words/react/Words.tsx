import React from 'react'
import { Typography } from '@mui/material'
import useWordsPresenter from './useWordsPresenter'

export default function Words() {
    const { getWords } = useWordsPresenter()

    return (
        <>
            {getWords().map((word) => (
                <Typography variant="body1" gutterBottom key={word}>
                    {word}
                </Typography>
            ))}
        </>
    )
}
