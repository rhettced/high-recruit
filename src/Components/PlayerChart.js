import React, { Component } from 'react'
import Axios from 'axios';
import Chart from "chart.js";
import BulkExports from 'twilio/lib/rest/preview/BulkExports';
//import classes from "./LineGraph.module.css";
import './PlayerChart.scss';

export default class LineGraph extends Component {
    constructor(){
        super();
        this.state = {
            playerStats: []
        }
    }

    getStats = () => {
        Axios.get(`/api/playerstats`)
            .then(res => {
                this.setState({ playerStats: res.data[0]})
            })
            .catch(err => console.log(err))
    }
    chartRef = React.createRef();
    componentDidMount(){
        this.getStats();
    }
    
    componentDidUpdate(prevProps,prevState) {
        if(prevState!==this.state){
            const myChartRef = this.chartRef.current.getContext("2d");
            const {avg_aces,avg_blocks,avg_digs,avg_kills,avg_hit_attempts} = this.state.playerStats;
            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: ["Aces", "Blocks", "Digs","Hit Attempts","Kills"],
                    datasets: [
                        {
                            label: "My Stats",
                            data: [avg_aces,avg_blocks,avg_digs,avg_kills,avg_hit_attempts],
                        },
                        {
                            label: 'Total Average',
                            data: [1,2,3,2,3],
                        }
                    ]
                },
                options: {
                    
                }
            });
        }
    }
    render() {
        console.log(this.state.playerStats)
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