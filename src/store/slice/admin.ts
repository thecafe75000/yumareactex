import { createSlice } from '@reduxjs/toolkit'
// import {useSelector} from 'react-redux'
import { TBody, getAdminInfo, postAdminLogin } from '@/api/admin'
import type {TDispatch} from '@/store'

const admin = createSlice({
  name: 'admin',
  initialState: {
    token: localStorage.getItem('token'),
    info: null
  }, 
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload
      localStorage.setItem('token', payload)
    },
    // 更新管理员信息
    setInfo: (state, { payload }) => {
      state.info = payload
    },

    // 退出登陆
    loginOut: (state) =>{
      // 清空storage
      localStorage.clear()
      // 更新状态初始值
      state.token = null
    }
  }
})

// 调用登陆接口
export const postAdminLoginAsync = (body: TBody) => {
  return async function (dispatch: TDispatch) {
    const data:any = await postAdminLogin(body) 
    dispatch(setToken(data.token))
    return data
  }
}

// 调用获取管理员admin信息接口
export const getAdminInfoAsync = () => {
  return async function (dispatch:TDispatch) {
    const { info } = await getAdminInfo() as any
    dispatch(setInfo(info))
  }
}

// export const useSelectorAdmin = ()=> useSelector((state:TStoreState)=> state.admin)
export const { setToken,loginOut,setInfo } = admin.actions
export default admin.reducer