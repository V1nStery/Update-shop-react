import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchAllProducts } from '../api';
import ProductCard, { CardContainer } from '../ProductCard/ProductCard'; // Импортируем CardContainer
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSlider = styled(Slider)`
    max-width: 1300px;
    margin: 20px auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 20px;

    .slick-slide > div {
        display: flex;
        justify-content: center; /* Центрируем карточки по горизонтали */
        align-items: center;
        padding: 45px;
    }

    .slick-prev, .slick-next {
        z-index: 2;
        width: 40px !important; /* Уменьшаем размер стрелок */
        height: 40px !important;
        background-color: rgba(0, 0, 0, 0.2) !important;
        border-radius: 50% !important;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        &::before {
            color: #007bff !important;
            font-size: 20px; /* Уменьшаем размер иконок стрелок */
        }
    }

    .slick-prev {
        left: 10px; /* Увеличиваем отступ слева */
    }

    .slick-next {
        right: 10px; /* Увеличиваем отступ справа */
    }
`;

const settings = {
    dots: true,
    infinite: false, // Отключить бесконечную прокрутку
    speed: 500,
    slidesToShow: 3, // Показываем 3 карточки за раз
    slidesToScroll: 1, // Прокручиваем на 1 карточку
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2, // На экранах меньше 992px показываем 2 карточки
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1, // На экранах меньше 768px показываем 1 карточку
            }
        }
    ]
};

const SliderCard = () => {
    const [products, setProducts] = useState([]); // Массив товаров

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchAllProducts();
                setProducts(fetchedProducts.slice(0, 5)); // Загружаем только 5 товаров для примера
            } catch (e) {
                console.error(e);
            }
        };
        loadProducts();
    }, []);

    return (
        <div>
            <h1 className='d-flex justify-content-center mt-4'>Каталог товаров:</h1>
            <StyledSlider {...settings}>
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
                {/* Кнопка "Показать еще" как отдельный слайд */}
                <div>
                    <CardContainer>
                        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                            <Button variant="outline-primary" as={Link} to="/ProductsPage" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                Показать еще
                            </Button>
                        </Card>
                    </CardContainer>
                </div>
            </StyledSlider>
        </div>
    );
};

export default SliderCard;