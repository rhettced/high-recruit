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
            playerStats: [],
            allStats: []
        }
    }

    getPlayerStats = () => {
        Axios.get(`/api/playerstats`)
            .then(res => {
                this.setState({ playerStats: res.data[0]})
            })
            .catch(err => console.log(err))
    }

    getAllStats = () => {
        Axios.get('/api/totalplayerstats')
        .then(res => {
            this.setState({ allStats: res.data[0]})
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.getPlayerStats();
        this.getAllStats();
    }
    
    chartRef = React.createRef();
    componentDidUpdate(prevProps,prevState) {
        if(prevState!==this.state){
            const myChartRef = this.chartRef.current.getContext("2d");
            const {avg_aces,avg_blocks,avg_digs,avg_kills,avg_hit_attempts} = this.state.playerStats;
            const {avg_acest,avg_blockst,avg_digst,avg_killst,avg_hit_attemptst} = this.state.allStats;
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
                            data: [avg_acest,avg_blockst,avg_digst,avg_killst,avg_hit_attemptst],
                        }
                    ]
                },
                options: {
                    
                }
            });
        }
    }
    render() {
        console.log(this.state.allStats);
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