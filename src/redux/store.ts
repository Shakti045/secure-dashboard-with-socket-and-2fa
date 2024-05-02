import { configureStore } from '@reduxjs/toolkit'
import signupslice from './slice/signupslice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        signup: signupslice
    }
  })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']