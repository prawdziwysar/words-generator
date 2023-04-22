import all from './pl.json'

export default function WordsPresenter({ input }: { input: string }) {
    return {
        getWords() {
            const possibleLetters = input
                .replaceAll(' ', '')
                .toLowerCase()
                .split('')
                .reduce((current, newone) => {
                    const element = current.find(
                        (value) => value.letter === newone
                    )

                    if (element) {
                        element.counter += 1

                        return current
                    }

                    return [...current, { letter: newone, counter: 1 }]
                }, [] as { letter: string; counter: number }[])

            return all
                .filter((word) => {
                    return word
                        .split('')
                        .reduce((current, newone) => {
                            const element = current.find(
                                (value) => value.letter === newone
                            )

                            if (element) {
                                element.counter += 1

                                return current
                            }

                            return [...current, { letter: newone, counter: 1 }]
                        }, [] as { letter: string; counter: number }[])
                        .every(
                            ({ letter, counter }) =>
                                (possibleLetters.find(
                                    (e) => e.letter === letter
                                )?.counter ?? 0) >= counter
                        )
                })
                .sort((a, b) => b.length - a.length)
        },
    }
}
