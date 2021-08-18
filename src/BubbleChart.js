import React from 'react';
import Plot from 'react-plotly.js';

class App extends React.Component {
    render() {
        const { data, value } = this.props;
        const [x, y, size, text] = data;
        const title = `Frequency per Million of "${value}" by Gender and Genre`;

        return (
            <Plot
                data={[
                    {
                        x, y, text, 
                        mode: 'markers+text',
                        marker: {
                            size,
                            sizemode: 'area',
                        },
                    },
                ]}
                layout={{
                    title,
                    autosize: true,
                }}
                useResizeHandler={true}
                style={{width: "100%", height: "100%"}}
            />
        );
    }
}

export default App;
