import React, { useState } from 'react';
import { updateProduct, deleteProduct } from '../api';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const EditProductForm = ({ product, onUpdate, onDelete, token, id }) => {
    const [formData, setFormData] = useState({ ...product });
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const updatedFormData = new FormData();
        for (const key in formData) {
            if (key !== 'image') {
                updatedFormData.append(key, formData[key]);
            }
        }

        if (imageFile) {
            updatedFormData.append('image', imageFile);
        }

        try {
            const response = await updateProduct(id, updatedFormData, token);
            console.log('Продукт обновлен:', response);

            if (imageFile) {
                const imageFormData = new FormData();
                imageFormData.append('image', imageFile);

                const imageResponse = await axios.post(
                    `http://127.0.0.1/myApiLaravel/my-app/public/api/products/${id}/image`,
                    imageFormData,
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                    }
                );
                console.log('Картинка загружена:', imageResponse.data);
            }

            onUpdate(response); // Обновляем состояние продукта
            setSuccess(true); // Устанавливаем успешное сообщение
        } catch (err) {
            console.error('Ошибка при обновлении:', err);
            setError(err.response?.data?.message || 'Что-то пошло не так!');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                await deleteProduct(id, token);
                alert('Товар успешно удален');
                onDelete(); // Вызываем onDelete после успешного удаления
            } catch (error) {
                console.error('Ошибка при удалении товара:', error);
                setError(error.message || 'Ошибка при удалении');
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card className="shadow success">
                        <Card.Body>
                            <h2 className="text-center mb-4">Редактировать товар</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">Товар успешно обновлен!</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Название товара</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formColor" className="mb-3">
                                    <Form.Label>Цвет</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPrice" className="mb-3">
                                    <Form.Label>Цена</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        value={formData.price}
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
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMemory" className="mb-3">
                                    <Form.Label>Память</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="memory"
                                        value={formData.memory}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formImage" className="mb-3">
                                    <Form.Label>Изображение товара</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" type="submit">
                                        Сохранить
                                    </Button>
                                    <Button variant="danger" type="button" onClick={handleDelete}>
                                        Удалить товар
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

export default EditProductForm;