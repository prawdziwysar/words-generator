import { WebRtcContextModel } from '../../../webRtcContext/WebRtcContext'

export default function MainPresenter({
    isReady,
    localDescription,
    candidates,
}: WebRtcContextModel) {
    return {
        isReady() {
            return isReady ? 'ready' : 'not ready'
        },
        getLocalDescription() {
            return JSON.stringify(localDescription)
        },
        getIceCandidates() {
            return candidates
                .map((candidate) => JSON.stringify(candidate))
                .join('#')
        },
    }
}
