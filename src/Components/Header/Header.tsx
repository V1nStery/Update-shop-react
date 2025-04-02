import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../AdminMenu/AuthProvider';

const Styles = styled.div`
    .navbar {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        max-width: 1300px;
        margin: 0 auto;
        margin-top: 20px;
    }

    .navbar::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background-color: #f8f9fa;
        border-radius: 0 0 20px 20px;
        z-index: -1;
    }

    body {
        margin: 0;
        background-color: #f1f1f1;
    }

    .admin-mode {
        color: red;
        font-weight: bold;
        margin-left: 10px;
    }
`;

const Header: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Состояние для поискового запроса
    const navigate = useNavigate(); // Хук для навигации
    const { isAdmin } = useAuth(); // Получаем состояние isAdmin из контекста

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1/myApiLaravel/my-app/public/api/callbacks', formData);
            setSubmitted(true);
            setFormData({ name: '', phone: '' });
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const handleSearch = () => {
        // Перенаправляем пользователя на страницу ProductsPage с параметром поиска
        navigate(`/ProductsPage?search=${searchQuery}`);
    };

    return (
        <Styles>
            <Navbar expanded={expanded} bg="light" expand="lg" className="px-5 py-2 shadow">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        Update
                    </Navbar.Brand>
                    {isAdmin && <span className="admin-mode">Режим администратора</span>} {/* Отображаем надпись, если пользователь администратор */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className="d-flex justify-content-center w-100 align-items-center my-3">
                            <Form className="d-flex align-items-center w-50">
                                <FormControl 
                                    type="text" 
                                    placeholder="Поиск" 
                                    className="me-2 w-75" 
                                    value={searchQuery} 
                                    onChange={(e) => setSearchQuery(e.target.value)} 
                                />
                                <Button variant="btn btn-outline-success rounded-4" onClick={handleSearch}>
                                    Найти
                                </Button>
                            </Form>
                        </div>
                        <Nav className="ms-auto d-flex align-items-center">
                            <Nav.Link as={Link} to="/about" className="me-3 d-inline-block btn btn-outline-secondary rounded-4" onClick={() => setExpanded(false)}>
                                О&nbsp;нас
                            </Nav.Link>
                            <Button variant="btn btn-outline-primary rounded-4" onClick={() => { setShowModal(true); setExpanded(false); }}>
                                Заказать звонок
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Заказать звонок</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {submitted ? (
                        <div>
                            <p>Ваши данные отправлены к специалистам. Первый освободившийся специалист свяжется с вами как можно быстрее (наши часы работы с 8.00 до 20.00).</p>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Ваше имя</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhone"  className='mb-2'>
                                <Form.Label>Ваш номер</Form.Label>
                                <Form.Control 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </Styles>
    );
};

export default Header;