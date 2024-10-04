import { nprogress } from '@mantine/nprogress'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILoading {
  tokens: string[]
  isShowing: boolean
}

const initialState: ILoading = {
  tokens: [],
  isShowing: false
}

const loadingReducerSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoadingScreen: (state, action: PayloadAction<string>) => {
      const nextToken = [...state.tokens, action.payload]
      state.tokens = nextToken
      state.isShowing = nextToken.length > 0
      if (nextToken.length > 0) nprogress.start()
    },
    hideLoadingScreen: (state, action: PayloadAction<string>) => {
      const tokenArray = [action.payload]
      const nextTokens = state.tokens.filter((x) => !tokenArray.includes(x))

      state.tokens = nextTokens
      state.isShowing = nextTokens.length > 0
      if (nextTokens.length === 0) nprogress.complete()
    },
    clear: () => {
      initialState
    }
  }
})

const { showLoadingScreen, hideLoadingScreen, clear } =
  loadingReducerSlice.actions

export default loadingReducerSlice
export { showLoadingScreen, hideLoadingScreen, clear }
