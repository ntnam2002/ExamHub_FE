import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    Line,
    Bar,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import Card from '@/components/ui/Card'

const StudentExamStatistics = () => {
    // Sample data for student performance
    const examScores = [
        { subject: 'Toán', score: 85 },
        { subject: 'Lý', score: 78 },
        { subject: 'Hóa', score: 92 },
        { subject: 'Sinh', score: 88 },
        { subject: 'Văn', score: 75 },
        { subject: 'Anh', score: 90 },
    ]

    const scoreProgress = [
        { month: 'T1', score: 75 },
        { month: 'T2', score: 78 },
        { month: 'T3', score: 80 },
        { month: 'T4', score: 85 },
        { month: 'T5', score: 88 },
        { month: 'T6', score: 90 },
    ]

    const examResults = [
        { name: 'Đạt', value: 15 },
        { name: 'Khá', value: 30 },
        { name: 'Giỏi', value: 40 },
        { name: 'Xuất sắc', value: 15 },
    ]

    const timeSpent = [
        { subject: 'Toán', time: 120 },
        { subject: 'Lý', time: 90 },
        { subject: 'Hóa', time: 100 },
        { subject: 'Sinh', time: 110 },
        { subject: 'Văn', time: 150 },
        { subject: 'Anh', time: 80 },
    ]

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Thống kê kết quả thi của bạn
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <Card>Điểm số theo môn học</Card>
                    <Card>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={examScores}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Card>

                <Card>
                    <Card>Tiến độ điểm số qua các tháng</Card>
                    <Card>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={scoreProgress}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Card>

                <Card>
                    <Card>Phân bố kết quả thi</Card>
                    <Card>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    label
                                    dataKey="value"
                                    data={examResults}
                                    fill="#8884d8"
                                />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Card>

                <Card>
                    <Card>Thời gian làm bài theo môn học (phút)</Card>
                    <Card>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={timeSpent}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="time" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Card>
            </div>
        </div>
    )
}

export default StudentExamStatistics
