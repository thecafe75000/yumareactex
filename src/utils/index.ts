import { useDispatch } from 'react-redux'
import { TDispatch } from '@/store'
import { App } from 'antd'

export const useMessage = function () {
  const { message } = App.useApp()
  return message
}

// 封装dispatch, 这种封装在 TypeScript 项目中尤为重要
// 在使用 TypeScript 时，可以为 useAppDispatch 提供类型约束，确保 Dispatch 的参数和你的 Redux 配置匹配
export const useAppDispatch = function () {
  return useDispatch<TDispatch>()
}
