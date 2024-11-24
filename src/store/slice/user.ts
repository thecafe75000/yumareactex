import { createSlice } from '@reduxjs/toolkit'
import { getUserList } from '@/api/user'
import type { TDispatch } from '@/store'

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

export const getUserListAsync = (pageNo:number, pageSize:number, keyword?:string) =>{
  return async function (dispatch:TDispatch) {
    const result: any = await getUserList(pageNo, pageSize, keyword)
    console.log('result', result) // 为什么result.data是undefined? 
    dispatch(setUserList(result.userList))
    return result
  }
}

export const {setUserList} = user.actions
export default user.reducer