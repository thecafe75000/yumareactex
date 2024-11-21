import { createSlice } from '@reduxjs/toolkit'

const config = createSlice({
  name: 'config',
  initialState: {
    loading: false,
    items: [{ label: 'Home', key: '/', closable: false }]
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    addItem: (state, { payload:{pathname, titleInfo}}) => {
      if (titleInfo && !state.items.some((item) => item.key === pathname)) {
        state.items.push({
          label: titleInfo.title,
          key: pathname,
          closable: true
        })
      }
    },
    delItem: (state, { payload }) => {
       state.items.splice(payload,1)
    }
  }
})

export const { setLoading, addItem, delItem } = config.actions
export default config.reducer