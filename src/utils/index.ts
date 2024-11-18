import { useDispatch } from 'react-redux'
import { TDispatch } from '@/store'
import { App } from 'antd'

export const useMessage = function () {
  const { message } = App.useApp()
  return message
}

// 封装一个支持异步的dispatch
export const useAppDispatch = function () {
  return useDispatch<TDispatch>()
}
