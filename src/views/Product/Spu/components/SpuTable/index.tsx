import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Space, Table } from 'antd'
import { useAppDispatch } from '@/utils'
import type { TStoreState } from '@/store'
import { getSpuListAsync, useSelectorSpu } from '@/store/slice/spu'
import { setIsAddBtn } from '@/store/slice/config'
import { getSkuListBySpuId } from '@/api/sku'


const SpuTable = (props:any) => {
  const { setSpuInfo, setOpen, setSkuList } = props
  const dispatch = useAppDispatch()
  const { pageInfo, categoryId } = useSelector((state: TStoreState) => state.config)
  const { spuList } = useSelectorSpu()
  const navigate = useNavigate()

  useEffect(() => {
    const { category1Id, category2Id, category3Id } = categoryId
    // console.log(categoryId)
    dispatch(getSpuListAsync({
      pageNo: 1,
      pageSize: pageInfo.pageSize,
      category1Id,
      category2Id,
      category3Id
    })
    )
  }, [categoryId])

  return (
    <Flex vertical gap='middle'>
      {/* 添加Spu的按钮 */}
      <Button
        // 非空字符串取反为false
        disabled={!categoryId.category3Id}
        type='primary'
        style={{ width: 200 }}
        onClick={() => {
          // 将 SPU 表单展示出来
          dispatch(setIsAddBtn(true))
          setSpuInfo(null)
        }}
      >
        Add Spu
      </Button>
      <Table
        bordered={true}
        rowKey='_id'
        pagination={{
          ...pageInfo,
          onChange(current, pageSize) {
            dispatch(getSpuListAsync({ pageNo: current, pageSize }))
          }
        }}
        columns={[
          {
            title: 'Number',
            align: 'center',
            width: 70,
            render(id, row, index) {
              return (pageInfo.current - 1) * pageInfo.pageSize + index + 1
            }
          },
          {
            title: 'Spu Name',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: 'Spu Description',
            align: 'center',
            dataIndex: 'description'
          },
          {
            title: 'Operation',
            align: 'center',
            dataIndex:'_id',
            render(id,rows:any) {
              return (
                <Space>
                  <Button
                    onClick={() => navigate('/product/sku', {
                      state: {
                        category1Id:rows.category1Id,
                        category2Id:rows.category2Id,
                        category3Id: rows.categoryId,
                        spuId: id
                      }
                    })}
                  >Add Sku</Button>
                  {/* 编辑 Spu 的按钮 */}
                  <Button type='primary' onClick={() => {
                    // 显示Spu表单
                    dispatch(setIsAddBtn(true))
                    // 将当前要编辑的内容传递给组件SpuForm让其有初始内容
                    setSpuInfo({ ...rows })
                  }}>Edit</Button>
                  <Button type='primary' onClick={async () => {
                    const result:any = await getSkuListBySpuId(id)
                    setSkuList(result.skuList)
                    setOpen(true)
                  }} >Check Spu</Button>
                </Space>
              )
            }
          }
        ]}
        dataSource={spuList}
      />
    </Flex>
  )
}

export default SpuTable
