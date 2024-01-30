import { api }                                 from '../../../app/api.ts'
import { setUser }                             from '../../../redux/userSlice.ts'
import { IRegisterRequest, IRegisterResponse } from '../types'

const registerService = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<IRegisterResponse, IRegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }){
        const { data } = await queryFulfilled
        dispatch(setUser(data))
      },
    }),
    phone: build.mutation<IRegisterResponse, { username: string, phone: string }>({
      query: (body) => ({
        url: '/auth/phone',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }){
        const { data } = await queryFulfilled
        dispatch(setUser(data))
      },
    }),
    code: build.mutation<string, { username: string }>({
      query: (body) => ({
        url: '/auth/email/code',
        method: 'POST',
        body,
      }),
    }),
    verify: build.mutation<IRegisterResponse, { username: string, code: string }>({
      query: (body) => ({
        url: '/auth/email/verify',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }){
        const { data } = await queryFulfilled
        dispatch(setUser(data))
      },
    }),
    password: build.mutation<IRegisterResponse, { username: string, password: string }>({
      query: (body) => ({
        url: '/auth/update/password',
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }){
        const { data } = await queryFulfilled
        dispatch(setUser(data))
      },
    }),
  }),
})

export const {
  useRegisterMutation,
  usePhoneMutation,
  useCodeMutation,
  useVerifyMutation,
  usePasswordMutation,
} = registerService
