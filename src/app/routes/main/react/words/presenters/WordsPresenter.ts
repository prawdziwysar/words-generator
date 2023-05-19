export default function WordsPresenter({
    words,
    wordsProgress,
}: {
    words: string[]
    wordsProgress: number
}) {
    return {
        getWords() {
            return words
        },
        getWordsProgress() {
            return new Intl.NumberFormat(navigator.language, {
                style: 'percent',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(wordsProgress)
        },
        getWordsProgressValue() {
            return Math.round(wordsProgress * 100)
        },
        displayProgress() {
            return wordsProgress !== 1
        },
        displayEmptyState() {
            return wordsProgress === 1 && !words.length
        },
        getEmtyStateText() {
            return 'start writting something'
        },
    }
}
