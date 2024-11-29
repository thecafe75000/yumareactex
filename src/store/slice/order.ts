import { createSlice } from '@reduxjs/toolkit'
import { getOrderList } from '@/api/order'
import type { TDispatch } from '@/store'
import { setPageInfo } from './config'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderList:[]
  },
  reducers: {
    setOrderList: (state,{payload}) => {
      state.orderList = payload
    }
  }
})

// 异步 action
 export const getOrderListAsync = (pageNo:number, pageSize: number) => {
   return async function (dispatch: TDispatch) {
     const { orderList,pageNo:current,count:total } = (await getOrderList(pageNo, pageSize)) as any
     dispatch(setOrderList(orderList))
     dispatch(setPageInfo({
       current,
       total
     }))
   }
}

export const {setOrderList} = orderSlice.actions
export default orderSlice.reducer