import { App } from 'antd'

export const useMessage = function () {
  const { message } = App.useApp()
  return message
}