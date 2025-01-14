import request from '@/axios/request'

// 根据 spuId 获取 skuList 列表 /product/skuBySpuId/?pageNo=1&pageSize=5&spuId=67014090bb021072bd248846
export const getSkuListBySpuId = (spuId:string) => {
    return request.get('/product/skuBySpuId', {
      params: {
            spuId,
            pageNo: 1,
            pageSize: 10000
      }
    })
}

// 获取Sku列表 /product/skuList?pageNo=1&pageSize=5&category1Id=67001d601f26a08d9b27c605&category2Id=67001e521f26a08d9b27c66d&category3Id=67001e621f26a08d9b27c675
export type TSkuParams = {
  pageNo: number
  pageSize: number
  category1Id?: string
  category2Id?: string
  category3Id?: string
}
export const getSkuList = (params: TSkuParams) => {
  return request.get('/product/skuList', {
    params
  })
}

// 根据分类ID获取SPU列表 /product/allSpuList/:categoryId
export const getSpuListByCategoryId = (categoryId:string) => {
  return request.get(`/product/allSpuList/${categoryId}`)
}

// 添加Sku  /product/sku
export const postProductSku = (body:any) => {
  return request.post('/product/sku', body)
}

// 修改
export const putProductSku = (body: any) => {
  return request.put('/product/sku', body)
}