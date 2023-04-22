// prettier-ignore
import { useEffect, useMemo, useState } from "react";
import { WebRtcContextModel } from './WebRtcContext'
import forceNonNullable from '../utils/forceNonNullable'

export default function useWebRtcContextInit() {
    const pc = useMemo(
        () =>
            new RTCPeerConnection({
                // prettier-ignore
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                // prettier-ignore
                iceTransportPolicy: "all",
            }),
        []
    )
    const [localCandidates, setLocalCandidates] = useState<RTCIceCandidate[]>(
        []
    )
    const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [localDescription, setLocalDescription] =
        useState<RTCSessionDescriptionInit | null>(null)
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        pc.ondatachannel = (event) => {
            setDataChannel(event.channel)
        }
        pc.onicecandidate = (event) =>
            event.candidate &&
            event.candidate.candidate &&
            setLocalCandidates((c) => [...c, forceNonNullable(event.candidate)])
        pc.onicegatheringstatechange = () => {
            if (pc.iceGatheringState === 'complete') {
                setIsReady(true)
            }
        }
        pc.onicecandidateerror = () => console.error
    }, [])

    function createDescription() {
        return pc
            .createOffer({ offerToReceiveAudio: true })
            .then((descriptor) => {
                pc.setLocalDescription(descriptor)
                setLocalDescription(descriptor)
            })
    }

    async function createAnswer(remoteDescription: RTCSessionDescription) {
        pc.setRemoteDescription(remoteDescription)

        const description = await pc.createAnswer()

        pc.setLocalDescription(description)
        setLocalDescription(description)

        return description
    }

    function connect(remoteCandidates: RTCIceCandidate[], timeout = 5000) {
        console.log(remoteCandidates)

        return new Promise<void>((resolve) => {
            remoteCandidates.forEach((candidate) =>
                pc.addIceCandidate(candidate)
            )
            pc.onconnectionstatechange = () => {
                if (pc.connectionState === 'connected') {
                    setConnected(true)
                    resolve(undefined)
                }
            }
        })
    }

    function createDataChannel() {
        setDataChannel(pc.createDataChannel('data'))
    }

    function setRemoteDescription(remoteDescription: RTCSessionDescription) {
        pc.setRemoteDescription(remoteDescription)
    }

    return {
        localDescription,
        createAnswer,
        createDescription,
        connect,
        createDataChannel,
        setRemoteDescription,
        dataChannel,
        candidates: localCandidates,
        isReady,
        connected,
    } as WebRtcContextModel
}
