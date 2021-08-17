import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Typography, Toolbar, Box, Paper, Grid } from '@material-ui/core';

import axios from 'axios';
import Header from './Header';
import Body from './Grid';

const url = 'https://raw.githubusercontent.com/beloiual/gendered-lyrics/main/React.JS/src/src/totalData.json'

class App extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            data: {},
            disabled: true,

            value: null,
            word: 'hello',
        };
    }

    setValue = (word) => {
        this.setState({ word });
    }

    load = () => {
        const { data, word } = this.state;

        return Object.entries(data).map( ([gender, genres]) => (
            Object.entries(genres).map( ([genre, words]) => {
                const reducer = (accumulator, currentValue) => (
                    accumulator + currentValue
                );
                console.log(words)
                const frequency = words[word] ?
                    words[word] * 500000 / Object.values(words).reduce(reducer) :
                    null;
                return (
                    <Grid item xs>
                        {[gender, genre, frequency].join(' ')}
                    </Grid>
                );
            })
        )).flat(3);
    }

    async componentDidMount() {
        const resp = await axios.get(url)
        console.log(resp);
        const { data } = resp;

        const disabled = false;
        this.setState({ data, disabled });
    }

    render() {
        const { data, items, disabled } = this.state;

        return (
            <div>
                <Header />
                <Toolbar />
                <Body
                    setValue={this.setValue}
                    disabled={disabled}
                />
                <Grid container spacing={3}>
                    {this.load()}
                </Grid>
            </div>
        );
    }
}

export default App;
