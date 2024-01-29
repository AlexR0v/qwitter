import { api }              from '../../../app/api.ts'
import { IRegisterRequest } from '../types'

const registerService = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<IRegisterRequest, unknown>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useRegisterMutation,
} = registerService