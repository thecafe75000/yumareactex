import { createSlice } from '@reduxjs/toolkit'
import { getUserList, putStateUserInfoById } from '@/api/user'
import type { TDispatch } from '@/store'
import { setPageInfo } from './config'

const user = createSlice({
  name: 'user',
  initialState: {
    userList:[]
  },
  reducers: {
    setUserList: (state,{payload}) => {
      state.userList = payload
    }
  }
})

// 获取用户列表
export const getUserListAsync = (pageNo:number, pageSize:number, keyword?:string) =>{
  return async function (dispatch:TDispatch) {
    const result: any = await getUserList(pageNo, pageSize, keyword)
    // console.log('result', result)
    dispatch(setUserList(result.userList))
    dispatch(setPageInfo({current:result.pageNo, total: result.count}))
    return result
  }
}

// 用户账号冻结状态改变后要重新获取用户列表
export const putStateUserInfoByIdAsync = (id: string, status: number, pageNo: number) => {
  // console.log('userlist pageNo', pageNo)
  return async function (dispatch: TDispatch) {
    const result = await putStateUserInfoById(id, status)
    await dispatch(getUserListAsync(pageNo, 5))
    return result
  }
}

export const {setUserList} = user.actions
export default user.reducer