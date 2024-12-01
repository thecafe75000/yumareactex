import request from '@/axios/request'

// 获取所有商品分类
export const getProductAllCategoryList = () => {
  return request.get('/product/AllCategoryList')
}