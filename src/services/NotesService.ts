import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {INote} from "../store/redusers/notes/notes.state.ts";

interface addItemProps{
  note: INote;
}

export const notesAPI = createApi({
  reducerPath: "notesAPI",
  baseQuery: fetchBaseQuery({baseUrl : "http://localhost:3001"}),
  tagTypes: ['Notes'],
  endpoints: (build) => ({
    fetchAllNotes: build.query<INote[], string> ({
      query: (userId) => ({
        url: `/notes?userId=${userId}`,
      }),
      providesTags: result => ["Notes"]
    }),
    addNote: build.mutation<INote, addItemProps>({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: note
      }),
      invalidatesTags: ["Notes"]
    }),
    deleteNote: build.mutation<INote, INote>({
      query: (note) => ({
        url: `/notes/${note._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"]
    }),
    patchNote: build.mutation<INote, INote>({
      query: (item) => ({
        url: `/notes/${item._id}`,
        method: "PATCH",
        body: item
      }),
      invalidatesTags: ["Notes"]
    }),
    putNote: build.mutation<INote, INote>({
      query: (note) => ({
        url: `/notes/${note._id}`,
        method: "PUT",
        body: note
      }),
      invalidatesTags: ["Notes"]
    })

  })
})