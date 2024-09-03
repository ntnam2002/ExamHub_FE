import { Container } from '@/components/shared'
import { Card } from '@/components/ui'
import { Flex, Typography } from 'antd'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import Chart from 'react-apexcharts'

const { Title } = Typography

function OnlineExamStatistics() {
    // Biểu đồ cột: Số lượng bài thi theo môn học CNTT
    const subjectExamCountOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: 'Helvetica, Arial, sans-serif',
        },
        title: {
            text: 'Số lượng bài thi theo môn học CNTT',
        },
        xaxis: {
            categories: [
                'Lập trình',
                'Mạng',
                'Cơ sở dữ liệu',
                'Hệ điều hành',
                'An ninh mạng',
                'Trí tuệ nhân tạo',
            ],
        },

        dataLabels: {
            enabled: true,
        },

        colors: ['#008FFB'],
    }

    const subjectExamCountSeries = [
        {
            name: 'Số lượng bài thi',
            data: [150, 120, 100, 80, 130, 140],
        },
    ]

    // Biểu đồ đường: Điểm trung bình theo thời gian
    const averageScoreOptions: ApexOptions = {
        chart: {
            type: 'line',
            height: 350,
        },
        title: {
            text: 'Điểm trung bình theo tháng',
            style: {
                fontFamily: 'sans-serif',
            },
        },
        xaxis: {
            categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#00E396'],
    }

    const averageScoreSeries = [
        {
            name: 'Điểm trung bình',
            data: [7.5, 7.8, 7.2, 8.0, 7.9, 8.2],
        },
    ]

    // Biểu đồ tròn: Phân bố kết quả thi
    const examResultOptions: ApexOptions = {
        chart: {
            type: 'pie',
            height: 350,
        },
        labels: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu'],
        colors: ['#00E396', '#0090FF', '#FEB019', '#FF4560', '#775DD0'],
    }

    const examResultSeries = [15, 30, 35, 15, 5]

    // Biểu đồ sparkline: Số lượng thí sinh tham gia
    const participantCountOptions: ApexOptions = {
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
        colors: ['#008FFB'],
        title: {
            text: '1,254',
            offsetX: 0,
            style: {
                fontSize: '24px',
            },
        },
        subtitle: {
            text: 'Tổng số thí sinh',
            offsetX: 0,
            style: {
                fontSize: '14px',
            },
        },
    }

    const participantCountSeries = [
        {
            data: [3, 4],
        },
    ]

    return (
        <Container style={{ fontFamily: 'sans-serif' }}>
            <Title
                level={2}
                style={{ marginBottom: '24px', textAlign: 'center' }}
            >
                Thống kê hệ thống thi trực tuyến
            </Title>
            <Flex gap={24} wrap="wrap" justify="space-around">
                <Card
                    style={{
                        width: '48%',
                        minWidth: '300px',
                        marginBottom: '24px',
                        fontFamily: 'sans-serif',
                    }}
                >
                    <Chart
                        options={subjectExamCountOptions}
                        series={subjectExamCountSeries}
                        type="bar"
                        height={350}
                        style={{ fontFamily: 'sans-serif' }}
                    />
                </Card>
                <Card
                    style={{
                        width: '48%',
                        minWidth: '300px',
                        marginBottom: '24px',
                    }}
                >
                    <Chart
                        options={averageScoreOptions}
                        series={averageScoreSeries}
                        type="line"
                        height={350}
                    />
                </Card>
                <Card
                    style={{
                        width: '48%',
                        minWidth: '300px',
                        marginBottom: '24px',
                    }}
                >
                    <Chart
                        options={examResultOptions}
                        series={examResultSeries}
                        type="pie"
                        height={350}
                    />
                </Card>
                <Card
                    style={{
                        width: '48%',
                        minWidth: '300px',
                        marginBottom: '24px',
                    }}
                >
                    <Chart
                        options={participantCountOptions}
                        series={participantCountSeries}
                        type="area"
                        height={160}
                    />
                </Card>
            </Flex>
        </Container>
    )
}

export default OnlineExamStatistics
