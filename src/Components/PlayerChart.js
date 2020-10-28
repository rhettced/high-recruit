import React, { Component } from 'react'
import Axios from 'axios';
import Chart from "chart.js";
import BulkExports from 'twilio/lib/rest/preview/BulkExports';
//import classes from "./LineGraph.module.css";
import './PlayerChart.scss';
import {connect} from 'react-redux';

class LineGraph extends Component {
    constructor() {
        super();
        this.state = {
            playerStats: [],
            allStats: []
        }
    }

    getPlayerStats = () => {
        Axios.get(`/api/playerstats`)
            .then(res => {
                this.setState({ playerStats: res.data[0] })
            })
            .catch(err => console.log(err))
    }

    getAllStats = () => {
        Axios.get('/api/totalplayerstats')
            .then(res => {
                this.setState({ allStats: res.data[0] })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getPlayerStats();
        this.getAllStats();
    }

    roundDecimal = (num) => {
        Math.round((num*100)/100);
    }

    chartRef = React.createRef();
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            Chart.defaults.global.defaultFontSize = 30;
            const myChartRef = this.chartRef.current.getContext("2d");
            const { avg_aces, avg_blocks, avg_digs, avg_kills, avg_hit_attempts } = this.state.playerStats;
            const { avg_acest, avg_blockst, avg_digst, avg_killst, avg_hit_attemptst } = this.state.allStats;
            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: ["Aces/game", "Blocks/game", "Digs/game", "Hit Attempts/game", "Kills/game"],
                    datasets: [
                        {
                            label: `${this.props.playerReducer.player.name} stats`,
                            data: [avg_aces, avg_blocks, avg_digs, avg_hit_attempts, avg_kills],
                        },
                        {
                            label: 'Total Average',
                            data: [avg_acest, avg_blockst, avg_digst, avg_hit_attemptst, avg_killst],
                            backgroundColor: 'black'
                        }
                    ]
                },
                options: {
                    legend: {
                        labels:{
                            fontSize: 20
                        }
                    },
                    elements:{
                        point:{
                            radius: 6,
                            backgroundColor: 'rgba(224, 65, 65, 0.692)',
                        },
                        line:{
                            borderColor: 'rgba(224, 65, 65, 0.692)',
                            stepped: true,
                        }
                    },
                    showLines: false,
                    responsive: false,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            //ticks: { display: false },
                            gridLines: {
                                display: true,
                                drawBorder: false
                            }
                        }],
                        yAxes: [{
                            ticks: {beginAtZero: true},
                            gridLines: {
                                display: true,
                                drawBorder: false
                            }
                        }]
                    }
                }
            });
        }
    }
    render() {
        console.log(this.state.allStats);
        return (
            <div className='player-chart'>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

const mapMyStateToProps = reduxState => reduxState;
export default connect(mapMyStateToProps)(LineGraph);