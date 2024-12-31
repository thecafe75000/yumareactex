import { useState } from 'react'
import { Drawer, Flex, Switch, Table, Image} from 'antd'
import { useSelector } from 'react-redux'
import CategoryListRedux from '@/views/Product/components/CategoryListRedux'
import SpuTable from './components/SpuTable'
import SpuForm from './components/SpuForm'
import type { TStoreState } from '@/store'
import { useAppDispatch } from '@/utils'
import { useEffect } from 'react'
import { setIsAddSpuBtn } from '@/store/slice/config'

const Spu = () => {
  const { isAddSpuBtn } = useSelector((state: TStoreState) => state.config)
  const dispatch = useAppDispatch()
  const [spuInfo, setSpuInfo] = useState<any>(null)
  const [spuSaleAttrList, setSpuSaleAttrList] = useState([]) 
  const [open, setOpen] = useState(false)
  const [skuList, setSkuList] = useState([])

  useEffect(() => {
    dispatch(setIsAddSpuBtn(false))
  },[])

  return (
    <Flex vertical gap='middle'>
      <CategoryListRedux />
      {/* Spu列表的渲染 */}
      {isAddSpuBtn || (
        <SpuTable
          setSpuSaleAttrList={setSpuSaleAttrList}
          setSpuInfo={setSpuInfo}
          setOpen={setOpen}
          setSkuList={setSkuList}
        />
      )}
      {/* 添加Spu表单 */}
      {isAddSpuBtn && (
        <SpuForm spuInfo={spuInfo} setSpuSaleAttrList={setSpuSaleAttrList} />
      )}

      <Drawer
        // 在上方显示
        placement='top'
        title='Sku List'
        height={500}
        onClose={() => {
          setOpen(false)
        }}
        open={open}
      >
        <Table
          pagination={false}
          rowKey='_id'
          bordered={true}
          columns={[
            {
              title: 'Number',
              align: 'center',
              render(id, rows, index) {
                return index + 1
              }
            },
            {
              title: 'Sku Full Name',
              align: 'center',
              dataIndex: 'fullName'
            },
            {
              title: 'Sales or Not',
              align: 'center',
              dataIndex: 'isSale',
              render(showFlag, rows: any) {
                return (
                  <Switch
                    onChange={() => {}}
                    checked={showFlag === 1 ? true : false}
                  />
                )
              }
            },
            {
              title: 'Sku Photo',
              align: 'center',
              dataIndex: 'defaultImg',
              render(imgUrl) {
                return <Image src={'/api/' + imgUrl} height={60} />
              }
            },
            {
              title: 'Price',
              align: 'center',
              dataIndex: 'price'
            },
            {
              title: 'Weight',
              align: 'center',
              dataIndex: 'weight'
            }
          ]}
          dataSource={skuList}
        />
      </Drawer>
    </Flex>
  )
}

export default Spu
