import { createSlice } from '@reduxjs/toolkit'

const config = createSlice({
  name: 'config',
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, {payload}) => {
      state.loading = payload
    }
  }
})

export const {setLoading} = config.actions
export default config.reducer