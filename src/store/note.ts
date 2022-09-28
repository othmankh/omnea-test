import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useApolloClient } from "@apollo/client";
import { ADD_NOTE, LIST_NOTES } from "../graphql/notes";
import { AddNoteInput, Note } from "../models";
import ApolloClientSingleton from "../clients/apollo.client";


interface NoteState {
    notes: null | Note[]
    loading: boolean
    addingNote: boolean
}

export const listNotes = createAsyncThunk('note/list', async (_, thunkApi: any) => {
    const client = ApolloClientSingleton.getInstance().apolloClient

    const {data} = await client.query({
        query: LIST_NOTES,
        fetchPolicy: 'no-cache'
    })
    return data?.notes
});

export const addNote = createAsyncThunk('note/add', async (args: AddNoteInput, thunkApi: any) => {
    const client = ApolloClientSingleton.getInstance().apolloClient
    const {data} = await client.mutate({
        mutation: ADD_NOTE,
        variables: {
            object: args
        }
    })

    return data.insert_notes_one

});

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: null,
        loading: false,
        addingNote: false,
    } as NoteState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listNotes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(listNotes.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = action.payload
        });
        builder.addCase(listNotes.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(addNote.pending, (state) => {
            state.addingNote = true;
        });
        builder.addCase(addNote.fulfilled, (state, action) => {
            state.addingNote = false;
            if (state.notes === null) {
                state.notes = [action.payload]
            } else {
                state.notes.unshift(action.payload)
            }
        });
        builder.addCase(addNote.rejected, (state) => {
            state.addingNote = false;
        });


    }
});

export default noteSlice.reducer;