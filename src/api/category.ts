import request from '@/axios/request'

// 获取所有商品分类
export const getProductAllCategoryList = () => {
  return request.get('/product/AllCategoryList')
}

// 获取分类的渲染, 即根据ID修改商品类别是否显示 http://127.0.0.1:9292/product/showFlag/:categoryId/:showFlag
export const putProductShowFlag = (categoryId: string, showFlag: number) => {
  return request.put(`/product/showFlag/${categoryId}/${showFlag}`)
}

// 添加商品分类 http://127.0.0.1:9292/product/category
export type TCategoryInfo = {
  parentId?: string
  name: string
  showFlag: number
  sort: number
}
export const postProductCategory = (body:TCategoryInfo) => {
  return request.post('/product/category', body)
}