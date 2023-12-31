import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    voteNote(state, action) {
      return `you voted '${action.payload}'`
    },
    createAnecdoteNote(state, action) {
      return `you created '${action.payload}'`
    },
    clearNote() {
      return ''
    },
  },
})

export const { voteNote, createAnecdoteNote, clearNote } = notificationSlice.actions
export default notificationSlice.reducer
