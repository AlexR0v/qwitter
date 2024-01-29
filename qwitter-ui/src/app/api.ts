import type {Middleware} from '@reduxjs/toolkit'
import {isRejectedWithValue} from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json')
            return headers
        },
    }),
    reducerPath: 'apiWeb',
    tagTypes: [],
    endpoints: () => ({}),
})

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.error('We got a rejected action!')
        console.log(action)
    }

    return next(action)
}