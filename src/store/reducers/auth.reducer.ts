import { nprogress } from '@mantine/nprogress'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuth {
  isSignedIn: boolean
}

const initialState: IAuth = {
  isSignedIn: false
}

const authReducerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload
    },
    clear: () => {
      initialState
    }
  }
})

const { setSignedIn, clear } = authReducerSlice.actions

export default authReducerSlice
export { setSignedIn, clear }
