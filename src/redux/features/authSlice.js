import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: 0,
  nim: "",
  // email: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id
      state.nim = action.payload.nim
      state.username = action.payload.username
      // state.email = action.payload.email
    },
    logout: (state) => {
      state.id = 0
      state.nim = ""
      // state.email = ""
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
