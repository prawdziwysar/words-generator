import { useEffect, useRef, useState } from 'react'
import eachInDiffrentTask from '../../../../../utils/eachInDiffrentTask'
import groupBy from '../../../../../utils/groupBy'
import useMainContext from '../../UseMainContext'
import WordsPresenter from '../presenters/WordsPresenter'
import all from './pl.json'

function reduceToLetterCount(word: string) {
    return word.split('').reduce((current, newone) => {
        const element = current.find((value) => value.letter === newone)

        if (element) {
            element.counter += 1

            return current
        }

        return [...current, { letter: newone, counter: 1 }]
    }, [] as { letter: string; counter: number }[])
}

export default function useWordsPresenter() {
    const { input } = useMainContext()
    const [words, setWords] = useState<string[]>([])
    const [wordsProgress, setWordsProgress] = useState(1)
    const currentInput = useRef(input)

    useEffect(() => {
        currentInput.current = input
        setTimeout(() => {
            const possibleLetters = reduceToLetterCount(
                input.replaceAll(' ', '').toLowerCase()
            )
            const allWordsThatCanBeCreated = all.filter((word) => {
                return reduceToLetterCount(word).every(
                    ({ letter, counter }) =>
                        (possibleLetters.find((e) => e.letter === letter)
                            ?.counter ?? 0) >= counter
                )
            })

            eachInDiffrentTask(
                Array.from(
                    groupBy(
                        allWordsThatCanBeCreated.flatMap((word) => [
                            ...allWordsThatCanBeCreated.map((secoundWord) => ({
                                word,
                                secoundWord,
                            })),
                            {
                                word,
                                secoundWord: '',
                            },
                        ]),
                        (_, index) =>
                            index % (allWordsThatCanBeCreated.length * 1000)
                    ),
                    ([_, value]) => value
                ),
                (grouped, index, whole, reject) => {
                    if (input !== currentInput.current) {
                        reject()

                        return [] as {
                            word: string
                            secoundWord: string
                        }[]
                    }

                    setWordsProgress(index / whole.length)

                    return grouped.filter(({ word, secoundWord }) => {
                        return reduceToLetterCount(word + secoundWord).every(
                            ({ letter, counter }) =>
                                (possibleLetters.find(
                                    (e) => e.letter === letter
                                )?.counter ?? 0) >= counter
                        )
                    })
                }
            )
                .then((state) => {
                    if (input !== currentInput.current) return

                    const result = state
                        .flatMap((s) => s)
                        .filter(
                            ({ word, secoundWord }, index, wholeArray) =>
                                index >
                                wholeArray.findIndex(
                                    (val) =>
                                        val.word === secoundWord &&
                                        val.secoundWord === word
                                )
                        )
                        .map(
                            ({ word, secoundWord }) => `${word} ${secoundWord}`
                        )

                        .sort((a, b) => b.length - a.length)
                        .filter((_, i) => i < 40)

                    setWordsProgress(1)
                    setWords(result)
                })
                .catch(() => {
                    /**/
                })
        }, 0)
    }, [input])

    return WordsPresenter({ words, wordsProgress })
}
