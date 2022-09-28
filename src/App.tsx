import React from 'react';
import './App.css';
import NoteForm from "./components/NoteForm/NoteForm";
import NotesList from "./components/NotesList/NotesList";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/material";

function App() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
            marginTop={5}
        >
            <Grid container item xs={8} direction={'column'}>
                <Grid xs={12} item>
                    <NoteForm maxCharacters={180}/>
                </Grid>
            </Grid>
            <Grid container item xs={8} direction={'column'}>
                <Grid item xs={12}>
                    <NotesList/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
