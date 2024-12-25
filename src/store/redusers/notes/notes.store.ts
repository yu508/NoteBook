import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import {initialState, INote} from "./notes.state.ts";

const notesStore = createSlice({
  name: "notesSlice",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<INote[]>) {
      state.push(...action.payload);
    },
  }
})

export const {
  setNotes
} = notesStore.actions

export default notesStore.reducer
