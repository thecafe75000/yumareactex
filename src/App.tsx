import Router from '@/routes'
import { useEffect } from 'react'
import {useAxiosInterceptors} from '@/axios/request'

const App = () => {
  const axiosInterceptors = useAxiosInterceptors()
  useEffect(() => {
    axiosInterceptors()
  }, [])
  return <Router />
}

export default App;
