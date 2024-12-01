import { getProductAllCategoryList } from '@/api/category'
import { createSlice } from '@reduxjs/toolkit'
import type { TDispatch } from '@/store'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    // 产品分类信息
    categoryList:[]
  },
  reducers: {
    setCategoryList: (state, { payload }) => {
      state.categoryList = payload
    }
  }
})

// 异步 action
export const getProductAllCategoryListAsync = () => { 
  return async function (dispatch:TDispatch) {
    const {categoryList} = await getProductAllCategoryList() as any 
    // console.log('procategory', categoryList)
    dispatch(setCategoryList(categoryList))
  }
}

export const { setCategoryList } = categorySlice.actions

export default categorySlice.reducer