import { createSlice } from '@reduxjs/toolkit'
import { getOrderList } from '@/api/order'

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
   return async function () {
    await getOrderList(pageNo, pageSize)
  }
}

export const {setOrderList} = orderSlice.actions
export default orderSlice.reducer