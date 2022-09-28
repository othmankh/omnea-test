import { gql } from "@apollo/client";

export const LIST_NOTES = gql`
    query listNotes($limit: Int, $offset: Int) {
        notes(limit:$limit, offset:$offset, order_by: {
            id: desc
        }){
            id
            text
        }
    }
`

export const ADD_NOTE = gql`
    mutation addNote($object: notes_insert_input!) {
        insert_notes_one(object: $object) {
            id
            text
        }
    }
`