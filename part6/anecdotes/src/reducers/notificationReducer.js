import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNote(state, action) {
      return action.payload
    },
    clearNote() {
      return ''
    },
  },
})

export const { createAnecdoteNote, setNote, clearNote } = notificationSlice.actions

export const setNotification = (msg, time) => {
  return async (dispatch) => {
    dispatch(setNote(msg))
    window.setTimeout(() => {
      dispatch(clearNote())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
