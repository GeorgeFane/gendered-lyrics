import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Typography, Toolbar, Box, Paper, Grid } from '@material-ui/core';

import axios from 'axios';
import Header from './Header';
import Body from './Body';
import BubbleChart from './BubbleChart';

const url = 'https://raw.githubusercontent.com/beloiual/gendered-lyrics/main/React.JS/src/src/totalData.json'

class App extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            data: {},
            disabled: true,

            value: null,
            rows: [],
        };
    }

    setValue = (value) => {
        const { data } = this.state;
        console.log(data)

        const array = Object.entries(data).map( ([gender, genres], y) => (
            Object.entries(genres).map( ([genre, words], x) => {
                const reducer = (accumulator, currentValue) => (
                    accumulator + currentValue
                );
                const size = !words[value] ? 0 :
                    words[value] * 5000000 / Object.values(words).reduce(reducer);
                    
                const text = size ? genre + ': ' + gender : '';
                const height = y + (x % 2) * 0.2;
                
                return [ genre, height, size, text ];
            })
        )).flat(1);
        console.log(array)

        // transpose
        const rows = array[0].map((_, colIndex) => array.map(row => row[colIndex]));
        this.setState({ rows, value });
    }

    async componentDidMount() {
        const resp = await axios.get(url)
        const { data } = resp;

        const disabled = false;
        this.setState({ data, disabled });

        this.setValue('hello');
    }

    render() {
        const { disabled, value, rows } = this.state;
        console.log(value)

        return (
            <div>
                <Header />
                <Toolbar />

                <Body
                    setValue={this.setValue}
                    disabled={disabled}
                    value={value}
                />

                <BubbleChart
                    data={rows}
                    value={value}
                />
            </div>
        );
    }
}

export default App;
