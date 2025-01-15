import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Carousel, Descriptions, Drawer, Flex, Image } from 'antd'
import CategoryListRedux from '../components/CategoryListRedux'
import SkuTable from './components/SkuTable'
import SkuForm from './components/SkuForm'
import type { TStoreState } from '@/store'
import { useAppDispatch } from '@/utils'
import { setIsAddBtn } from '@/store/slice/config'
import './index.less'

const Sku = () => {
  const { isAddBtn } = useSelector((state: TStoreState) => state.config)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [skuInfo, setSkuInfo] = useState<any>({})

  // 只有在组件挂载和卸载的时候,下面useEffect的逻辑才会被执行
  useEffect(() => {
    // 组件卸载时执行
    return function () {
      dispatch(setIsAddBtn(false))
    }
  }, [])

  useEffect(() => {
    // 组件首次渲染(挂载时执行)
    if (location.state) {
      // 切换至添加sku表单
      dispatch(setIsAddBtn(true))
    }
  },[location.state])

  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux />
      {isAddBtn || <SkuTable setOpen={setOpen} setSkuInfo={setSkuInfo} />}
      {isAddBtn && <SkuForm />}
      <Drawer
        width={760}
        placement='left'
        title='Sku Details'
        onClose={() => {
          setOpen(false)
        }}
        open={open}
      >
        <Descriptions title={skuInfo.fullName} bordered column={2}>
          <Descriptions.Item label='Title' span={2}>
            {skuInfo.name}
          </Descriptions.Item>
          <Descriptions.Item label='Brand' span={2}>
            <Image src={'/api' + skuInfo.trademarkInfo?.img} />
          </Descriptions.Item>
          <Descriptions.Item label='Price'>
            $ {skuInfo.price?.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label='Weight'>
            {skuInfo.weight?.toFixed(2)} g
          </Descriptions.Item>
          <Descriptions.Item label='Description' span={2}>
            {skuInfo.description}
          </Descriptions.Item>
          <Descriptions.Item label='Sale or Not'>
            {skuInfo.isSale === 1 ? 'Yes' : 'Not'}
          </Descriptions.Item>
          <Descriptions.Item label='Sorting'>{skuInfo.sort}</Descriptions.Item>
          <Descriptions.Item label='Attributes' span={2}>
            <Descriptions bordered column={2} size='small'>
              {skuInfo.skuAttr?.map((item: any) => {
                return (
                  <Descriptions.Item label={item.label} key={item.value}>
                    {item.value}
                  </Descriptions.Item>
                )
              })}
            </Descriptions>
          </Descriptions.Item>
          <Descriptions.Item label='SaleAttributes' span={2}>
            <Descriptions bordered column={2} size='small'>
              {skuInfo.skuSaleAttr?.map((item: any) => {
                return (
                  <Descriptions.Item label={item.label} key={item.value}>
                    {item.value}
                  </Descriptions.Item>
                )
              })}
            </Descriptions>
          </Descriptions.Item>
          <Descriptions.Item label='Sku Photos' span={2}>
            <div style={{width:200}}>
              {
                skuInfo.imgs && (
                    <Carousel autoplay>
                      {skuInfo.imgs?.map((item: any) => {
                        return (
                          <Image key={item.id} src={'/api/' + item.url} />
                        )
                      })}
                    </Carousel>
                )
              }
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </Flex>
  )
}

export default Sku 