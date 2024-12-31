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