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


// 添加商品品牌 /product/trademark
export interface BrandData {
  name: string
  img: string
  showFlag: number
  sort: number
}
export const addNewBrand = (body: BrandData) => {
  return request.post('/product/trademark', body)
}

// 获取所有品牌 /product/allTrademark
export const getAllBrands = () => {
  return request.get('/product/allTrademark')
}