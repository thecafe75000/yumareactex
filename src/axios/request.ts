import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setLoading } from '@/store/slice/config'
import { useMessage } from '@/utils'
import { useNavigate } from 'react-router-dom'

const request = axios.create({
  baseURL: '/api'
})

export const useAxiosInterceptors = () => {
  const message = useMessage()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return function () {
    request.interceptors.request.use((config) => {
      dispatch(setLoading(true))
      if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
      }
      return config
    })

    request.interceptors.response.use(({ data }) => {
        dispatch(setLoading(false))
        if (data.ok === 1) {
          return data
        } else if (data.ok === -2) {
          // token有异常的情况
          message.error(data.message)
          navigate('/login')
          return new Promise(() => {})
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
