import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/store/slice/config'
import { useMessage } from '@/utils/useMessage'


const request = axios.create({
  baseURL: '/api'
})

export const useAxiosInterceptors = () => {
  const message = useMessage()
  const dispatch = useDispatch()

  return function () {
    request.interceptors.request.use(config => {
      dispatch(setLoading(true))
      return config
    })

    request.interceptors.response.use(({ data }) => {
        dispatch(setLoading(false))
        if (data.ok === 1) {
          return data
        } else {
          message.error(data.message)
          return new Promise(() => {})
        }
      },
      (err) => {
        message.error(err.message)
        dispatch(setLoading(false))
        return new Promise(() => {})
      }
    )
  }
}

export default request
