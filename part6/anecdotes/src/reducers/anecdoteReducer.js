import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const [anecdoteToChange] = state.filter((p) => p.id === id)

      const changedAnecdotes = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdotes
      )
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
  },
})

export const { vote, appendAnecdote, setAnecdote, createAnecdote } = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export default anecdoteSlice.reducer
