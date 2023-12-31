import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      return state.concat({
        content,
        id: getId(),
        votes: 0
      })
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

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id },
//   }
// }

export const { vote, appendAnecdote, setAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
