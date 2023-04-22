import React from 'react'
import { Typography } from '@mui/material'
import TitlePresenter from '../presenters/TitlePresenter'

export default function Title() {
    const { getExplanation, getTitle } = TitlePresenter()

    return (
        <>
            <Typography variant="h3" gutterBottom>
                {getTitle()}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {getExplanation()}
            </Typography>
        </>
    )
}
