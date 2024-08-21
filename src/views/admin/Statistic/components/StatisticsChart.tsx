import { Container } from '@/components/shared'
import { Card } from '@/components/ui'
import { Flex, Typography } from 'antd'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import Chart from 'react-apexcharts'

const { Title } = Typography
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
        <Container>
            <Title
                level={2}
                style={{ marginBottom: '24px', textAlign: 'center' }}
            >
                School Statistics Dashboard
            </Title>
            <Flex gap={24} wrap="wrap" justify="space-around">
                <Card
                    style={{
                        width: '30%',
                        minWidth: '300px',
                        marginBottom: '24px',
                    }}
                >
                    <Title level={4}>Students vs Teachers</Title>
                    <Chart
                        options={barChartOptions}
                        series={barChartSeries}
                        type="bar"
                        height={350}
                    />
                </Card>
                <Card
                    style={{
                        width: '30%',
                        minWidth: '300px',
                        marginBottom: '24px',
                    }}
                >
                    <Title level={4}>Exam Score Trends</Title>
                    <Chart
                        options={lineChartOptions}
                        series={lineChartSeries}
                        type="line"
                        height={350}
                    />
                </Card>
                <Card
                    style={{
                        width: '30%',
                        minWidth: '300px',
                        marginBottom: '24px',
                    }}
                >
                    <Title level={4}>Pass/Fail Ratio</Title>
                    <Chart
                        options={pieChartOptions}
                        series={pieChartSeries}
                        type="pie"
                        height={350}
                    />
                </Card>
            </Flex>
            <Flex
                gap={24}
                wrap="wrap"
                justify="space-around"
                style={{ marginTop: '24px' }}
            >
                <Card style={{ width: '48%', minWidth: '300px' }}>
                    <Title level={4}>Score Overview</Title>
                    <Chart
                        options={sparklineOptions}
                        series={sparklineSeries}
                        type="area"
                        height={160}
                    />
                </Card>
                {/* Add additional sparkline charts here */}
            </Flex>
        </Container>
    )
}

export default StatisticsChart
