import { useEffect, useState } from 'react'
import { Select, Space } from 'antd'

const SaleAttrValueList = (props: any) => {
  const { spuSaleAttrList, onChange,value } = props
  // console.log('spusaleattrlistof props', spuSaleAttrList)
  const [skuSaleAttrValueList, setSkuSaleAttrValueList] = useState({})

  useEffect(() => {
    const skuSaleLength = Object.keys(skuSaleAttrValueList).length
    if (skuSaleLength > 0 && skuSaleLength === spuSaleAttrList.length) {
      onChange(skuSaleAttrValueList)
    }
  }, [skuSaleAttrValueList])

  return (
    <Space wrap={true}>
      {spuSaleAttrList.map((item: any) => {
        let defaultValue = value ? value[item.id]:undefined
        return (
          <Space key={item.id}>
            <label style={{ fontWeight: 'bold' }} htmlFor={item.id}>
              {item.name}
            </label>
            <Select
              placeholder={'Please choose ' + item.name}
              style={{ width: 180 }}
              defaultValue={defaultValue}
              options={item.valueArr.map((item: any) => ({
                value: item.id,
                label: item.name
              }))}
              // 收集表单数据
              onChange={(value) => {
                setSkuSaleAttrValueList({
                  ...skuSaleAttrValueList,
                  [item.id]: value
                })
              }}
            />
          </Space>
        )
      })}
    </Space>
  )
}

export default SaleAttrValueList
