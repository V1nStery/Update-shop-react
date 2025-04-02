import React, { FC, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const Login: FC = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null); // Состояние для отображения ошибок
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Сбрасываем ошибку перед отправкой

        try {
            const response = await axios.post('http://127.0.0.1/myApiLaravel/my-app/public/api/login', credentials);

            if (response.status === 200 && response.data.token) {
                login(response.data.token); // Сохраняем токен
                navigate('/admin', { replace: true }); // Перенаправляем на админ-панель
            } else {
                setError('Ошибка авторизации. Проверьте логи.');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Неверный логин или пароль');
            } else if (error.response) {
                setError(error.response.data.message || 'Ошибка сервера');
            } else if (error.request) {
                setError('Ошибка сети. Проверьте подключение к интернету.');
            } else {
                setError('Ошибка при отправке запроса.');
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow">
                        <Card.Body>
                            <h2 className="text-center mb-4">Вход в админ-панель</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Введите email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Введите пароль"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Войти
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;