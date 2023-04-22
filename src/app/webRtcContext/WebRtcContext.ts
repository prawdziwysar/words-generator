import React from 'react'

export interface WebRtcContextModel {
    localDescription: RTCSessionDescriptionInit | null
    createAnswer: (
        remoteDescription: RTCSessionDescription
    ) => Promise<RTCSessionDescriptionInit>
    connect: (
        remoteCandidates: RTCIceCandidate[],
        timeout?: number
    ) => Promise<void>
    createDataChannel: () => void
    dataChannel: RTCDataChannel | null
    candidates: RTCIceCandidate[]
    createDescription: () => void
    setRemoteDescription: (remoteDescription: RTCSessionDescription) => void
    isReady: boolean
    connected: boolean
}

const WebRtcContext = React.createContext<null | WebRtcContextModel>(null)

export default WebRtcContext
