import { TextField } from '@mui/material'
import React from 'react'
import useInputPresenter from './useInputPresenter'

export default function Input() {
    const { getLabel, getValue, onChange } = useInputPresenter()

    return (
        <TextField
            value={getValue()}
            label={getLabel()}
            onChange={onChange}
            fullWidth
        />
    )
}
