import useWebRtcContext from "../../../useWebRtcContext";
import MainPresenter from "../presenters/MainPresenter";

export default function useMainPresenter(){
    return MainPresenter(useWebRtcContext())
}