// src/App.js
import React from 'react'
import StatisticsChart from './components/StatisticsChart'

function Main() {
    return (
        <div className="App" style={{ padding: '20px' }}>
            <h1>Online Examination Statistics</h1>
            <StatisticsChart />
        </div>
    )
}

export default Main
