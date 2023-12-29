import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'notifications should appear here!',
  reducers: {
    initNotifications(state, action) {
      console.log(state, action)
    },
  },
})

export const { initNotifications } = notificationSlice.actions
export default notificationSlice.reducer
