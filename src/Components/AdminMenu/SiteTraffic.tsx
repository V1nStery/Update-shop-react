import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SiteTraffic = () => {
    const [chartData, setChartData] = useState({
        labels: [] as string[], // Массив дат
        datasets: [
            {
                label: 'Посещаемость',
                data: [] as number[], // Массив количества посещений
                borderColor: 'rgba(75, 192, 192, 1)', // Цвет линии
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Цвет заливки под линией
                borderWidth: 2, // Толщина линии
                tension: 0.4, // Сглаживание линии
            },
        ],
    });
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [error, setError] = useState<string | null>(null); // Состояние ошибки

    // Функция для загрузки данных о посещаемости
    const fetchTrafficData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1/myApiLaravel/my-app/public/api/site-traffic');
            const { labels, visits } = response.data;

            // Обновляем данные для графика
            setChartData({
                labels: labels,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: visits,
                    },
                ],
            });
            setLoading(false);
        } catch (err) {
            console.error('Ошибка при загрузке данных:', err);
            setError('Не удалось загрузить данные о посещаемости');
            setLoading(false);
        }
    };

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        fetchTrafficData();
    }, []);

    // Настройки графика
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'График посещаемости сайта за последние 7 дней',
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Начинать ось Y с нуля
            },
        },
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="shadow">
                        <Card.Body>
                            <h2 className="text-center mb-4">График посещаемости сайта</h2>
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Загрузка...</span>
                                    </Spinner>
                                </div>
                            ) : error ? (
                                <Alert variant="danger">{error}</Alert>
                            ) : (
                                <Line data={chartData} options={options} />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SiteTraffic;