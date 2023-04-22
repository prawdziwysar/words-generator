import useMainContext from '../../UseMainContext'
import WordsPresenter from '../presenters/WordsPresenter'

export default function useWordsPresenter() {
    return WordsPresenter(useMainContext())
}
