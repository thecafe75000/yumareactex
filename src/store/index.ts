import { configureStore } from '@reduxjs/toolkit'
import config from '@/store/slice/config'
import admin from '@/store/slice/admin'

const store = configureStore({
  reducer: {
    config,
    admin
  }
})

// 定义store里state的类型是TStoreState
export type TStoreState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch

export default store