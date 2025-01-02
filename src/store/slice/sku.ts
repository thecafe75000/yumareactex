import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { TSkuParams } from '@/api/sku'
import { TDispatch } from '@/store'
import { setPageInfo } from './config'
import { getSkuList } from '@/api/sku'

const skuSlice = createSlice({
  name: 'sku',
  initialState: {
    skuList: []
  },
  reducers: {
    setSkuList: (state, { payload }) => {
      state.skuList = payload
    }
  }
})

// 异步action
export const getSkuListAsync = (params: TSkuParams) => {
  return async (dispatch: TDispatch) => {
    const {
      skuList,
      pageNo: current,
      count: total
    } = (await getSkuList(params)) as any
    console.log('sku result', skuList)
    // 如果 dispatch 的参数是一个对象，那它是同步更改
    // 如果 diapatch 的参数是一个函数，那它是异步更改
    // 更新 skulist
    dispatch(setSkuList(skuList))
    // 更新页码信息
    dispatch(
      setPageInfo({
        current,
        total
      })
    )
  }
}

export const useSelectorSku = ()=> useSelector((state:any)=>state.sku)

export const { setSkuList } = skuSlice.actions
export default skuSlice.reducer
