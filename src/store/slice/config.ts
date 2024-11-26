import { createSlice } from '@reduxjs/toolkit'

const config = createSlice({
  name: 'config',
  initialState: {
    loading: false,
    items: [{ label: 'Home', key: '/', closable: false }],
    pageInfo: {
      current: 1,
      pageSize: 5,
      total: 100
    }
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    addItem: (state, { payload: { pathname, titleInfo } }) => {
      if (titleInfo && !state.items.some((item) => item.key === pathname)) {
        state.items.push({
          label: titleInfo.title,
          key: pathname,
          closable: true
        })
      }
    },
    delItem: (state, { payload }) => {
      state.items.splice(payload, 1)
    },
    setPageInfo: (state, { payload }) => {
      // 写法1
      // state.pageInfo.current = payload.current
      // state.pageInfo.total = payload.total

      // 写法2
      state.pageInfo = {
        ...state.pageInfo,
        ...payload
      }
    }
  }
})

export const { setLoading, addItem, delItem, setPageInfo } = config.actions
export default config.reducer