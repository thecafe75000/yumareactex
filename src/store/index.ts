import { configureStore } from '@reduxjs/toolkit'
import config from '@/store/slice/config'
import admin from '@/store/slice/admin'
import user from '@/store/slice/user'
import order from '@/store/slice/order'
import category from '@/store/slice/category'

// Redux Toolkit 的 configureStore 默认添加了 redux-thunk 作为中间件, 自动将中间件集成到 Store 中，无需显式配置中间件
// 它默认已经包含 Redux Thunk 中间件。这意味着 dispatch 函数已经支持异步操作
// store 默认包含了 Redux Thunk，因为是通过 configureStore 创建的
const store = configureStore({
  reducer: {
    config,
    admin,
    user,
    order,
    category
  }
})


// 定义store里state的类型是TStoreState
export type TStoreState = ReturnType<typeof store.getState>

// 定义store里dispatch的类型是TDispatch
export type TDispatch = typeof store.dispatch

export default store