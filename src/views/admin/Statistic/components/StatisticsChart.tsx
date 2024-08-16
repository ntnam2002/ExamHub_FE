import { Container } from '@/components/shared'
import { Card } from '@/components/ui'
import { Flex } from 'antd'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import Chart from 'react-apexcharts'

function StatisticsChart() {
    // Data for the bar chart
    const barChartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        title: {
            text: 'Number of Students and Teachers',
        },
        xaxis: {
            categories: ['Students', 'Teachers'],
        },
        dataLabels: {
            enabled: true,
        },
        colors: ['#00E396', '#008FFB'],
    }

    const barChartSeries = [
        {
            name: 'Count',
            data: [120, 15],
        },
    ]

    // Data for the line chart
    const lineChartOptions: ApexOptions = {
        chart: {
            type: 'line',
            height: 350,
        },
        title: {
            text: 'Exam Scores Over Time',
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May'],
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#FEB019'],
    }

    const lineChartSeries = [
        {
            name: 'Average Score',
            data: [75, 80, 70, 90, 85],
        },
    ]

    // Data for the pie chart
    const pieChartOptions: ApexOptions = {
        chart: {
            type: 'pie',
            height: 350,
        },
        labels: ['Pass', 'Fail'],
        colors: ['#00E396', '#FF4560'],
    }

    const pieChartSeries = [85, 15]

    // Sparkline and other small charts
    const sparklineOptions: ApexOptions = {
        chart: {
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: 'straight',
        },
        fill: {
            opacity: 0.3,
        },
        yaxis: {
            min: 0,
        },
        colors: ['blue'],
        title: {
            text: '$424,652',
            offsetX: 0,
            style: {
                fontSize: '24px',
            },
        },
        subtitle: {
            text: 'Sales',
            offsetX: 0,
            style: {
                fontSize: '14px',
            },
        },
    }

    const sparklineSeries = [
        {
            data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
        },
    ]

    return (
        <>
            <Flex gap={30}>
                <Card>
                    <h3>Bar Chart</h3>
                    <Chart
                        options={barChartOptions}
                        series={barChartSeries}
                        type="bar"
                        height={350}
                    />
                </Card>
                <Card>
                    <h3>Line Chart</h3>
                    <Chart
                        options={lineChartOptions}
                        series={lineChartSeries}
                        type="line"
                        height={350}
                    />
                </Card>
                <Card>
                    <h3>Pie Chart</h3>
                    <Chart
                        options={pieChartOptions}
                        series={pieChartSeries}
                        type="pie"
                        height={250}
                        width={350}
                    />
                </Card>
            </Flex>
            <Flex gap={30} style={{ marginTop: '20px' }}>
                <Card>
                    <h3>Sparkline Sales</h3>
                    <Chart
                        options={sparklineOptions}
                        series={sparklineSeries}
                        type="area"
                        height={160}
                    />
                </Card>
                {/* Add additional sparkline charts here */}
            </Flex>
        </>
    )
}

export default StatisticsChart
