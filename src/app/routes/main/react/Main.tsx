/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import useMainPresenter from './useMainPresenter'
import useWebRtcContext from '../../../useWebRtcContext'

export default function Main() {
    const { getLocalDescription, isReady, getIceCandidates } =
        useMainPresenter()
    const {
        createDescription,
        createAnswer,
        setRemoteDescription,
        candidates,
        dataChannel,
        createDataChannel,
        connect,
        connected,
    } = useWebRtcContext()
    const [desc, setDesc] = useState('')
    const [ans, setAns] = useState('')
    const [ice, setIce] = useState('')
    const [data, setData] = useState<string[]>([])
    const [dataSend, setDataSend] = useState('')

    useEffect(() => {
        if (dataChannel)
            dataChannel.onmessage = (e) => {
                setData((d) => [...d, e.data])
            }
    }, [dataChannel])

    return (
        <>
            <Typography variant="h2">
                {connected ? 'connected' : 'not connected'}
            </Typography>
            <Button onClick={createDescription}>create offer</Button>
            <TextField
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                label="offer"
            />
            <Button
                onClick={() =>
                    createAnswer(new RTCSessionDescription(JSON.parse(desc)))
                }
            >
                create answer
            </Button>
            <TextField
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                label="answer"
            />
            <Button
                onClick={() =>
                    setRemoteDescription(
                        new RTCSessionDescription(JSON.parse(ans))
                    )
                }
            >
                set answer
            </Button>
            <TextField
                value={ice}
                onChange={(e) => setIce(e.target.value)}
                label="ice"
            />
            <Button
                onClick={() =>
                    connect(
                        JSON.parse(ice).map(
                            (i: RTCIceCandidateInit) => new RTCIceCandidate(i)
                        )
                    )
                }
            >
                submit ice
            </Button>
            <TextField
                value={dataSend}
                onChange={(e) => setDataSend(e.target.value)}
                label="data"
            />
            <Button
                onClick={() => {
                    setData((d) => [...d, dataSend])
                    dataChannel?.send(dataSend)
                    setDataSend('')
                }}
            >
                submit data
            </Button>
            <Button
                onClick={() => {
                    createDataChannel()
                }}
            >
                create data channel
            </Button>
            {data.map((d) => (
                <Typography variant="body1" gutterBottom>
                    {d}
                </Typography>
            ))}
            <Typography variant="h2" gutterBottom>
                {isReady()}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Local Description
            </Typography>
            <Typography variant="body1" gutterBottom>
                {getLocalDescription()}
            </Typography>
            <Button
                onClick={() => {
                    navigator.clipboard.writeText(getLocalDescription())
                }}
            >
                copy
            </Button>
            <Typography variant="h6" gutterBottom>
                Ice candidates
            </Typography>
            <Typography variant="body1" gutterBottom>
                {JSON.stringify(candidates)}
            </Typography>
            <Button
                onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(candidates))
                }}
            >
                copy
            </Button>
        </>
    )
}
