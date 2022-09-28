import * as React from 'react';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Note } from "../../models";
import { listNotes } from "../../store/note";
import { CircularProgress, Typography } from "@mui/material";

export default function NotesList() {
    const [notesLocal, setNotesLocal] = useState<null | Note[]>(null)
    const dispatch = useDispatch<AppDispatch>()


    const {loading, notes} = useSelector((state: RootState) => state.note);

    useEffect(() => {
        setNotesLocal(notes)
    }, [notes])

    useEffect(() => {
        dispatch(listNotes())
    }, [])

    if (loading || !notesLocal) return (
        <Grid container alignItems={'center'} justifyContent={'center'}>
            <CircularProgress style={{margin: 5}} size={50}/>
            <Typography>
                Fetching Data
            </Typography>
        </Grid>
    )

    return (
        <Grid container item xs={12}
              alignItems={"center"}
              direction={'column'}
        >
            <List sx={{
                marginTop: 2,
                border: '1px solid #000000'
            }}>
                {notesLocal && notesLocal?.map((note: Note, index: number) =>
                    (<ListItem
                        sx={{
                            borderBottomStyle: 'solid',
                            borderBottomWidth: index < notesLocal.length - 1 ? 1 : 0,
                            borderBottomColor: '#000000',
                            background: index % 2 === 0 ? '#ffffff' : '#f1efef',
                        }}

                        key={note.id}>
                        <ListItemText
                            style={{
                                wordBreak: 'break-all'
                            }}
                            primary={note.text}
                        />
                    </ListItem>)
                )}
            </List>
        </Grid>
    );
}
