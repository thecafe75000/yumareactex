import request from '@/axios/request'

// 获取属性列表 /product/attr?pageNo=1&pageSize=2&category1Id=&category2Id=&category3Id=
export type TAttributesParams =  {
  pageNo: number
  pageSize: number
  category1Id?: string
  category2Id?: string
  category3Id?: string
}

export const getAttributesList = (params: TAttributesParams) => {
  return request.get('/product/attr', { params })
}

// 根据三级分类ID获取属性列表 /product/attr/:categoryId
export const getAttrListByCategoryId = (categoryId:string) => {
  return request.get(`/product/attr/${categoryId}`)
}
