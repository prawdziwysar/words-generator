import useMainContext from '../../UseMainContext'
import InputPresenter from '../presenters/InputPresenter'

export default function useInputPresenter() {
    return InputPresenter(useMainContext())
}
