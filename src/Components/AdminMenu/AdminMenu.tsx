import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './AdminMenu.css'; // Стили для админ-меню

const AdminMenu = () => {
    return (
        <div>
            <Header />
            <Container fluid className="admin-container container">
                <Row>
                    {/* Боковая панель */}
                    <Col md={2} className="sidebar">
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to="/admin/site-traffic" className="nav-link">
                                Посещаемость сайта
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/add-product" className="nav-link">
                                Добавить товар
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/messages" className="nav-link">
                                Сообщения
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin/ProductsPage" className="nav-link">
                                Страница всех товаров
                            </Nav.Link>
                        </Nav>
                    </Col>

                    {/* Основное содержимое */}
                    <Col md={10} className="main-content">
                        <Card className="admin-card">
                            <Card.Body>
                                <Outlet /> {/* Отображаем вложенные маршруты */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default AdminMenu;