import request from '@/axios/request'

// 获取商品品牌列表 /product/trademark?pageNo=1&pageSize=3&keyword=
export const getBrandsList = (pageNo:number, pageSize: number, keyword?:string) => {
  return request.get('/product/trademark', {
    params: {
      pageNo,
      pageSize,
      keyword
    }
  })
}