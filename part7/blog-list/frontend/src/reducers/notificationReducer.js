import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: '',
    timer: null,
    type: 'log'
  },
  reducers: {
    setText(state, action) {
      clearTimeout(state.timer)
      return action.payload
    },
    clearNotification() {
      return {
        notification: '',
        timer: null
      }
    }
  }
})


export const { setText, clearNotification } = notificationSlice.actions

export const setNotification = (notification, timeout, type) => {
  return dispatch => {
    const timer = setTimeout(() => dispatch(clearNotification()), timeout)
    dispatch(setText({ notification, timer, type }))
  }
}

export default notificationSlice.reducer