import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice }        from '@reduxjs/toolkit'
import { IRegisterResponse }  from '../features/register-modal/types'
import { RootState }          from './index'

export interface UserState {
  user: IRegisterResponse | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IRegisterResponse>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const userSelector = (state: RootState) => state.userData.user

export default userSlice.reducer