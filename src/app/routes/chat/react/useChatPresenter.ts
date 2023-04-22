import { useEffect, useState } from "react";
import useWebRtcContext from "../../../useWebRtcContext";
import forceNonNullable from "../../../utils/forceNonNullable";

export default function useChatPresenter(){
    const {dataChannel} = useWebRtcContext()
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    useEffect(()=>{
        forceNonNullable(dataChannel).onmessage = (event) => setChatMessages(messages=>([...messages, event.data]));
    },[])

}