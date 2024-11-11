import { configureStore } from '@reduxjs/toolkit'
import config from '@/store/slice/config'

const store = configureStore({
  reducer: {
    config
  }
})

// 定义store里state的类型是TStoreState
export type TStoreState = ReturnType<typeof store.getState>
export default store