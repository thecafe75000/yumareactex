import { useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Form, Input, Cascader, InputNumber, Switch } from 'antd'
import { useAppDispatch, useMessage} from '@/utils'
import type { TStoreState } from '@/store'
import { postProductCategoryAsync, putProductCategoryAsync } from '@/store/slice/category'


type TProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  info: any
  parentId: string[]
  // modalTitle: string
  // setModalTitle: React.Dispatch<React.SetStateAction<string>>
}

const CategoryModal = (props: TProps) => {
  const { isModalOpen, setIsModalOpen, info, parentId } = props
  const { categoryList } = useSelector((state: TStoreState) => state.category)
  const dispatch = useAppDispatch()
  const message = useMessage()
  // 获取表单实例
  const [form] = Form.useForm()

  const parentIdArr = useMemo(() => categoryList.map((item: any) => {
        let obj: any = {
          label: item.name,
          value: item._id
        }
        if (item.children) {
          obj.children = item.children.map((child: any) => {
            return {
              label: child.name,
              value: child._id
            }
          })
        }
        return obj
      }),[categoryList])
  // console.log('parentidarr',parentIdArr)

  useEffect(() => {
    if (info._id) {
      form.setFieldValue('sort', info.sort)
      form.setFieldValue('name', info.name)
      form.setFieldValue('showFlag', (info.showFlag === 1 ? true : false))
      form.setFieldValue('parentId', info.ids)
      form.setFieldValue('_id', info._id)
    } else {
      form.resetFields()
    }
    // setModalTitle('Modify product category')
  }, [info])

  useEffect(() => {
    if (parentId.length > 0) {
      form.setFieldValue('parentId', parentId)
    } else {
      form.resetFields()
    }
    // setModalTitle('Add product category')
  }, [parentId])

  return (
    <Modal
      forceRender
      // title={modalTitle}
      title='添加商品分类'
      maskClosable={false}
      open={isModalOpen}
      // closable={false}
      onOk={() => form.submit()}
      onCancel={()=>{setIsModalOpen(false)}}
    >
      <Form
        name='basic'
        // 表单实例
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          sort: 0, // 排序的默认值
          showFlag: true
        }}
        onFinish={async (body) => {
           body.showFlag = body.showFlag ? 1 : 0
           if (Array.isArray(body.parentId)) {
             body.parentId = body.parentId[body.parentId.length - 1]
           }
           // console.log('finish-body',body)
           // 存在_id就是修改商品分类,不存在就是添加商品分类
          if (body._id) {
            // 修改
             await dispatch(putProductCategoryAsync(body))
           } else {
             await dispatch(postProductCategoryAsync(body))
           }
           // 重置弹出框里表单的内容,即回填数据
           form.resetFields()
           setIsModalOpen(false)
           message.success('add new category successfully!')
        }}
        autoComplete='off'
      >
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='Previous Category'
          // name 的值要看接口文档
          name='parentId'
        >
          <Cascader
            changeOnSelect
            options={parentIdArr}
            placeholder='If this item is omitted, the top-level category is added'
          />
        </Form.Item>
        <Form.Item
          label='Category Name'
          // name 的值要看接口文档
          name='name'
          rules={[{ required: true, message: 'Please add a category!' }]}
        >
          <Input placeholder='Please add a category' />
        </Form.Item>
        <Form.Item label='Show or Not' name='showFlag'>
          <Switch defaultChecked={true} />
        </Form.Item>
        <Form.Item
          label='Sorting'
          // name 的值要看接口文档
          name='sort'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CategoryModal