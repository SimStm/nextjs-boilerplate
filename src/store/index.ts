import { createWrapper } from 'next-redux-wrapper'
import reduxPromiseMiddleware from 'redux-promise-middleware'

import { configureStore } from '@reduxjs/toolkit'
import loadingReducerSlice from './reducers/loading.reducer'
import authReducerSlice from './reducers/auth.reducer'

import Router from 'next/router'
import { InferRootState } from '@/store/root-reducer.types'
const reducer = {
  auth: authReducerSlice.reducer,
  loading: loadingReducerSlice.reducer
}

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: [reduxPromiseMiddleware as any]
})

export const storeWrapper = createWrapper(
  () => {
    return store
  },
  { debug: false }
)

type IStoreState = ReturnType<typeof store.getState>
export type IState = Omit<IStoreState, 'auth2'> & { auth2: any }
export type ReducerStateType = InferRootState<typeof reducer>
// TODO: CREATE A TYPE FOR AUTH
