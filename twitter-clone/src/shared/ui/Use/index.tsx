import { FC, use } from 'react'

interface Props<T> {
    promise: Promise<T>
    render: FC<{ data: T }>
}

export const Use = <T,>({ promise, render: Component }: Props<T>) => {
    return <Component data={use(promise)} />
}
