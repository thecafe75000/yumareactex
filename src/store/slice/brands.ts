import { createSlice } from '@reduxjs/toolkit'
import type { TDispatch, TGetState} from '@/store'
import { addNewBrand, BrandData, getBrandsList } from '@/api/brands'
import { setPageInfo } from '@/store/slice/config'


const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brandsList:[]
  },
  reducers: {
    setBrandsList: (state, {payload}) => {
      state.brandsList = payload
    }
  }
})

// 获取商品品牌列表的异步action
export const getBrandsListAsync = (pageNo:number, pageSize: number, keyword?:string) => {
  return async (dispatch: TDispatch) => {
    // trademarkList 是后端响应的对应品牌列表的数据名称(不能自己命名，要按照响应的数据来写)
    const { trademarkList, pageNo:current, count:total } = await getBrandsList(pageNo, pageSize, keyword) as any
    // console.log('brandslist', trademarkList)
    dispatch(setBrandsList(trademarkList))
    // 更新品牌列表的页码信息
    dispatch(setPageInfo({
      current,
      total
    }))
  }
}

// 添加商品品牌的异步action
export const addNewBrandAsync = (body: BrandData) => {
  return async (dispatch: TDispatch, getState:TGetState) => {
    const result = await addNewBrand(body)
    const {pageSize} = getState().config.pageInfo
    await dispatch(getBrandsListAsync(1, pageSize))
    return result
  }
}

export const { setBrandsList } = brandsSlice.actions

export default brandsSlice.reducer