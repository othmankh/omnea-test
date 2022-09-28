import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddNoteInput } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addNote } from "../../store/note";

export interface NoteTextFieldProps {
    maxCharacters: number
}


export default function NoteForm(props: NoteTextFieldProps) {
    const [textLength, setTextLength] = useState(0);
    const initialValues: AddNoteInput = {text: ''};
    const dispatch = useDispatch<AppDispatch>()
    const {addingNote} = useSelector((state: RootState) => state.note);

    const NoteSchema = Yup.object().shape({
        text: Yup.string()
            .max(180, 'Note is too Long!')
            .required('Note is required'),
    });

    useEffect(() => {
        if (!addingNote) {
            setTextLength(0)
        }
    }, [addingNote])


    const formik = useFormik({
        initialValues,
        validationSchema: NoteSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(addNote(values))
            formik.resetForm()
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextLength(event?.target?.value?.length || 0)
        formik.setFieldValue("text", event.target.value)
    };

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container item direction={'column'} rowSpacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="notes-text-field"
                        label="Note"
                        multiline
                        placeholder={"New note!"}
                        value={formik.values.text}
                        onChange={handleChange}
                        onBlur={() => {
                            //In case user changes their mind and they don't want to enter something it shouldn't stay red
                            formik.setFieldError("text", "")
                        }}
                        error={formik.touched.text && Boolean(formik.errors.text)}
                        inputProps={{maxLength: props.maxCharacters}}
                    />
                </Grid>

                <Grid container item xs={12} direction={"row"} spacing={2}>
                    {formik.errors.text &&
                        <Grid item xs={6} container>
                            <Typography color={'red'}>
                                {formik.errors.text}
                            </Typography>
                        </Grid>
                    }

                    <Grid container item xs={formik.errors.text ? 6 : 12} flexDirection={"row-reverse"}>
                        <Typography color={textLength === props.maxCharacters ? 'red' : 'black'}>
                            {textLength} / {props.maxCharacters}
                        </Typography>
                    </Grid>
                </Grid>

                <Button disabled={addingNote} color="primary" variant="contained" fullWidth type="submit" style={{
                    marginTop: 5,
                    marginBottom: 5
                }}>
                    {addingNote && <CircularProgress style={{margin: 5}} size={20}/>}
                    Save Note
                </Button>

            </Grid>
        </Box>
    );
}
