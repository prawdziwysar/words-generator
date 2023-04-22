// eslint-disable import/no-unresolved
import all from 'stopwords-json'

export default function WordsPresenter({ input }: { input: string }) {
    return {
        getWords() {
            console.log(all)

            return all.pl as string[]
        },
    }
}
