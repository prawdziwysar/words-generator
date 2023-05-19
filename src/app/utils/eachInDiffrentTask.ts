export default function eachInDiffrentTask<T, TResult>(
    array: T[],
    task: (
        element: T,
        index: number,
        wholeArray: T[],
        reject: () => void
    ) => TResult
) {
    return new Promise<TResult[]>((resolve, reject) => {
        const results = [] as TResult[]
        let wasRejected = false

        function wrappedReject() {
            wasRejected = true
            reject()
        }

        function wrappedTask(index: number) {
            if (wasRejected) return 0

            if (index < array.length) {
                return setTimeout(() => {
                    results.push(
                        task(array[index], index, array, wrappedReject)
                    )
                    wrappedTask(index + 1)
                }, 0)
            }

            resolve(results)

            return 0
        }

        wrappedTask(0)
    })
}
