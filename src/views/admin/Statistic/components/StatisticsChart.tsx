import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Typography } from 'antd'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts'
import { UserOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons'
import { systemStatistic } from '@/services/managementService'

const { Title } = Typography

const mockSubjectScores = [
    { subject: 'Lập trình C++', averageScore: 7.5 },
    { subject: 'Mạng máy tính', averageScore: 0.0 },
    { subject: 'Lập trình web', averageScore: 0.0 },
    { subject: 'Cơ sở dữ liệu', averageScore: 0.0 },
    { subject: 'Mạch điện tử', averageScore: 0.0 },
]

interface StatCardProps {
    icon: React.ReactNode
    title: string
    value: any
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
    <Card>
        <Card.Meta
            avatar={icon}
            title={title}
            description={
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    {value}
                </span>
            }
        />
    </Card>
)

const EducationStatisticsDashboard: React.FC = () => {
    const [statistics, setStatistics] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await systemStatistic()
                setStatistics(response.data)
            } catch (error) {
                console.error('Failed to fetch statistics', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStatistics()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <StatCard
                        icon={<UserOutlined />}
                        title="Tổng số tài khoản"
                        value={statistics?.totalUsers}
                    />
                </Col>
                <Col span={8}>
                    <StatCard
                        icon={<BookOutlined />}
                        title="Tổng số sinh viên"
                        value={statistics?.totalStudents}
                    />
                </Col>
                <Col span={8}>
                    <StatCard
                        icon={<TeamOutlined />}
                        title="Tổng số giáo viên"
                        value={statistics?.totalTeachers}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col span={12}>
                    <Card>
                        <Title level={4}>Thống kê điểm số theo môn</Title>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockSubjectScores}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="averageScore"
                                    fill="#1890ff"
                                    name="Điểm trung bình"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Title level={4}>Thống kê đăng nhập</Title>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={statistics?.loginLogs || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#8884d8"
                                    name="Số lượt truy cập hệ thống"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default EducationStatisticsDashboard
