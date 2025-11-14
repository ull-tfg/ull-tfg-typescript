export interface PropInfiniteSearchList<T> {
    label?: string
    fetchFn: (query: string, page: number, size: number) => Promise<T[]>
    itemText: string | ((item: T) => string)
    height: string | number
    itemKey: string | ((item: T, index: number) => string | number)
    pageSize?: number
}