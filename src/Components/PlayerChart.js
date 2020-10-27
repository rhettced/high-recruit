import React, { Component } from 'react'
import Chart from "chart.js";
import BulkExports from 'twilio/lib/rest/preview/BulkExports';
//import classes from "./LineGraph.module.css";
import './PlayerChart.scss';

export default class LineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Aces", "Blocks", "Digs","Hit Attempts","Kills"],
                datasets: [
                    {
                        label: "Current Sales",
                        data: [86, 67, 91],
                    },
                    {
                        label: 'Last Year Sales',
                        data: [150,200,250],
                    }
                ]
            },
            options: {
                
            }
        });
    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}