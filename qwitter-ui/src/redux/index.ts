import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import {api, rtkQueryErrorLogger} from '../app/api.ts'
import CounterSlice from './counterSlice.ts'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        counter: CounterSlice
    },
    middleware: (gDM) => gDM({serializableCheck: false}).concat(api.middleware).concat(rtkQueryErrorLogger),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch