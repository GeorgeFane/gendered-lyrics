import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Toolbar, Box, Paper, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid(props) {
    const classes = useStyles();

    const [value, setValue] = React.useState('');
    const onChange = (event) => setValue(event.target.value);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <Typography paragraph>
                            This website hosts a queryable database containing the occurance of words within the lyrics of Male, Female, and Other Artists within many different genres.
                        </Typography>

                        <Typography paragraph>
                            Input a word you want to search for and a frequency graph will appear showing you the frequency of the lyric in songs by different gendered artists in numerous genres.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs>
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                        onSubmit={(event) => {
                            event.preventDefault();
                            props.setValue(value)
                        }}
                    >
                        <TextField
                            label="Outlined"
                            variant="outlined"
                            onChange={onChange}
                        />
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}
