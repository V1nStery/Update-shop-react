import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchAllProducts } from '../api'; // Импортируем функцию для загрузки товаров
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для навигации

const Styles = styled.div`
    .slick-slider {
        max-width: 1300px;
        margin: 20px auto;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        padding: 20px;
    }

    .slick-slide > div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 20px !important;
    }

    .slick-prev, .slick-next {
        z-index: 2;
        width: 50px !important;
        height: 50px !important;
        background-color: rgba(0, 0, 0, 0.2) !important;
        border-radius: 50% !important;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        &::before {
            color: #007bff !important;
            font-size: 24px;
        }
    }

    .slick-prev {
        left: 20px;
    }

    .slick-next {
        right: 20px;
    }

    .carousel-item img {
        display: block;
        max-width: 100%;
        max-height: 300px;
        object-fit: contain;
    }

    @media (max-width: 768px) {
        .carousel .col-md-6 {
            width: 100%;
            max-width: 100%;
        }
    }
`;

const ProductSlider: React.FC = () => {
    const [products, setProducts] = useState([]); // Состояние для товаров
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const navigate = useNavigate(); // Хук для навигации

    // Загрузка товаров из базы данных
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchAllProducts();
                setProducts(fetchedProducts); // Загружаем все товары
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Настройки для slick-carousel
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    // Функция для перехода на страницу товара
    const handleViewProduct = (productId) => {
        navigate(`/Product/${productId}`); // Переход на страницу товара по его ID
    };

    // Фильтруем товары по id
    const firstSlide = products.find(product => product.id === 1); // Товар с id = 4 The first slide
    const lastSlide = products.find(product => product.id === 5); // Товар с id = 5

    return (
        <Styles>
            <Container className="mt-5">
                <h2 className='text-center'>Хиты продаж</h2>
                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    <Slider {...settings}>
                        {/* Первый слайд (товар с id = 4) */}
                        {firstSlide && (
                            <div key={firstSlide.id}>
                                <Row style={{ maxWidth: '900px', margin: '0 auto' }}>
                                    <Col md={5}>
                                        <img
                                            src={`http://127.0.0.1/myApiLaravel/my-app/storage/app/public/${firstSlide.image}`}
                                            alt={firstSlide.name}
                                            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Card style={{ border: 'none' }}>
                                            <Card.Body>
                                                <h3>{firstSlide.name}</h3>
                                                <ul className='mt-5'>
                                                    <li>Цвет: {firstSlide.color}</li>
                                                    <li>Память: {firstSlide.memory}</li>
                                                </ul>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p style={{ fontWeight: 600, marginTop: '20px' }}>{Math.floor(firstSlide.price)} ₽</p>
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleViewProduct(firstSlide.id)}
                                                    >
                                                        Перейти к товару
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        {/* Второй слайд (товар с id = 5) */}
                        {lastSlide && (
                            <div key={lastSlide.id}>
                                <Row style={{ maxWidth: '900px', margin: '0 auto' }}>
                                    <Col md={5}>
                                        <img
                                            src={`http://127.0.0.1/myApiLaravel/my-app/storage/app/public/${lastSlide.image}`}
                                            alt={lastSlide.name}
                                            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Card style={{ border: 'none' }}>
                                            <Card.Body>
                                                <h3>{lastSlide.name}</h3>
                                                <ul className='mt-5'>
                                                    <li>Цвет: {lastSlide.color}</li>
                                                    <li>Память: {lastSlide.memory}</li>
                                                </ul>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p style={{ fontWeight: 600, marginTop: '20px' }}>{Math.floor(lastSlide.price)} ₽</p>
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleViewProduct(lastSlide.id)}
                                                    >
                                                        Перейти к товару
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </Slider>
                )}
            </Container>
        </Styles>
    );
};

export default ProductSlider;