export default function groupBy<T, TKey>(
    array: T[],
    selector: (element: T, index: number, currentArray: T[]) => TKey
) {
    return array
        .map((...params) => ({
            element: params[0],
            key: selector(...params),
        }))
        .reduce((previousValue, { key, element }) => {
            previousValue.set(key, [...(previousValue.get(key) || []), element])

            return previousValue
        }, new Map<TKey, T[]>())
}
