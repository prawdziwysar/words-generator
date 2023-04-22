import {useContext} from 'react'
import forceNonNullable from "./utils/forceNonNullable";
import WebRtcContext from "./webRtcContext/WebRtcContext";

export default function useWebRtcContext(){
    return forceNonNullable(useContext(WebRtcContext))
}