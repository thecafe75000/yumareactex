import request from '@/axios/request'

export type TSpuParams = {
  pageNo: number
  pageSize: number
  category1Id?: string
  category2Id?: string
  category3Id?: string
}

// 获取Spu列表 /product/spuList/?pageNo=1&pageSize=1&category1Id=&category2Id=&category3Id=
export const getSpuList = (params:TSpuParams) => {
  return request.get('/product/spuList', {
    params
  })
}

// 获取Spu销售属性 /product/spuSaleAttrList
export const getSpuSaleAttrList = () => {
  return request.get('/product/spuSaleAttrList')
}

// 添加Spu /product/spu
export const postProductSpu = (body:any) => {
  return request.post('/product/spu', body)
}