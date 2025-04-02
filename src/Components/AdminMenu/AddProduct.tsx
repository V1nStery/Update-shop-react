import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        color: '',
        memory: '',
        description: '',
        price: '',
        image: null,
    });

    const [error, setError] = useState(null); // Состояние для отображения ошибок
    const [success, setSuccess] = useState(false); // Состояние для отображения успешного сообщения

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Сбрасываем ошибку перед отправкой
        setSuccess(false); // Сбрасываем успешное сообщение

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Токен отсутствует! Необходимо авторизоваться.');
            return;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('color', product.color);
        formData.append('memory', product.memory);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('image', product.image);

        try {
            const response = await fetch('http://127.0.0.1/myApiLaravel/my-app/public/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                let errorData = { message: 'Ошибка при добавлении товара' };
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                }
                throw new Error(`Ошибка ${response.status}: ${errorData.message}`);
            }

            const productData = await response.json();
            console.log('Товар добавлен:', productData);
            setSuccess(true); // Устанавливаем успешное сообщение
            setProduct({ // Сбрасываем форму
                name: '',
                color: '',
                memory: '',
                description: '',
                price: '',
                image: null,
            });
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center mt-5 mb-5">
                <Col md={8}>
                    <h2 className="text-center mb-4">Добавить новый товар</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Товар успешно добавлен!</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Название товара</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Введите название товара"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formColor" className="mb-3">
                            <Form.Label>Цвет</Form.Label>
                            <Form.Control
                                type="text"
                                name="color"
                                placeholder="Введите цвет"
                                value={product.color}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMemory" className="mb-3">
                            <Form.Label>Память</Form.Label>
                            <Form.Control
                                type="text"
                                name="memory"
                                placeholder="Введите объем памяти"
                                value={product.memory}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Введите описание товара"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice" className="mb-3">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Введите цену"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formImage" className="mb-3">
                            <Form.Label>Изображение товара</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Добавить товар
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;