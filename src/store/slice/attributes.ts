import { createSlice } from '@reduxjs/toolkit'
import { getAttributesList} from '@/api/attributes'
import type { TAttributesParams } from '@/api/attributes'
import type { TDispatch } from '@/store'

const attributesSlice =  createSlice({
  name: 'attributes',
  initialState: {
    attributesList:[]
  },
  reducers: {
    setAttributesList: (state,{payload}) => {
       state.attributesList = payload
    }
  }
})

// 获取属性列表的异步action
export const getAttributesListAsync = (params: TAttributesParams) => {
  return async (dispatch: TDispatch) => {
    const result = await getAttributesList(params) as any
    // console.log('attributes', result)
    dispatch(setAttributesList(result.attrList))
  }
}


export const { setAttributesList } = attributesSlice.actions

export default attributesSlice.reducer