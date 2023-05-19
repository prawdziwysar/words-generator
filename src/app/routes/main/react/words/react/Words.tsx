import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import useWordsPresenter from './useWordsPresenter'

export default function Words() {
    const {
        getWords,
        displayEmptyState,
        displayProgress,
        getWordsProgress,
        getWordsProgressValue,
        getEmtyStateText,
    } = useWordsPresenter()

    if (displayEmptyState())
        return (
            <Typography variant="caption" gutterBottom>
                {getEmtyStateText()}
            </Typography>
        )

    if (displayProgress()) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    height: '100px',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress
                        variant="determinate"
                        value={getWordsProgressValue()}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                        >
                            {getWordsProgress()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )
    }

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
