export default function InputPresenter({
    input,
    setInput,
}: {
    input: string
    setInput: (value: string) => void
}) {
    return {
        onChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
            setInput(e.target.value)
        },
        getValue() {
            return input
        },
        getLabel() {
            return 'write letters and words here'
        },
    }
}
