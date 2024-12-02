import { getProductAllCategoryList, putProductShowFlag, postProductCategory} from '@/api/category'
import { createSlice } from '@reduxjs/toolkit'
import type { TDispatch } from '@/store'
import type { TCategoryInfo } from '@/api/category'

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

// 异步 action 获取所有商品列表
export const getProductAllCategoryListAsync = () => { 
  return async function (dispatch:TDispatch) {
    const {categoryList} = await getProductAllCategoryList() as any 
    // console.log('procategory', categoryList)
    dispatch(setCategoryList(categoryList))
  }
}

// 根据show or not来渲染商品列表
export const putProductShowFlagAsync = (categoryId:string, showFlag:number) => {
  return async function(dispatch: TDispatch){
      await putProductShowFlag(categoryId, showFlag)
      await dispatch(getProductAllCategoryListAsync())
  }
}

// 添加商品类别
export const postProductCategoryAsync = (body: TCategoryInfo) => {
  return async (dispatch: TDispatch) => {
    await postProductCategory(body)
    await dispatch(getProductAllCategoryListAsync())
  }
}

export const { setCategoryList } = categorySlice.actions

export default categorySlice.reducer