import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type {TDispatch, TStoreState} from '@/store'
import { getSpuList } from '@/api/spu'
import type {  TSpuParams } from '@/api/spu'

const spuSlice = createSlice({
  name: 'spu',
  initialState: {
    spuList: []
  },
  reducers: {
    setSpuList: (state, { payload }) => {
      state.spuList = payload
    }
  }

})

// 异步action
export const getSpuListAsync = (params:TSpuParams) => {
  return async (dispatch:TDispatch) => {
    const result = await getSpuList(params) as any
    console.log('spu result', result)
    dispatch(setSpuList(result.spuList))
  }
}

export const useSelectorSpu = ()=> useSelector((state:TStoreState)=>state.spu)

export const { setSpuList } = spuSlice.actions
export default spuSlice.reducer