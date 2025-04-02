import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetchAllProducts } from '../api';

const ProductsPage = () => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [color, setColor] = useState('');
    const [memory, setMemory] = useState('');
    const [name, setName] = useState(''); // Используем name вместо model
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    // Функция для получения уникальных цветов
    const getUniqueColors = (products) => {
        const colors = products.map(product => product.color);
        return [...new Set(colors)];
    };

    // Функция для получения уникальных значений памяти
    const getUniqueMemories = (products) => {
        const memories = products.map(product => product.memory);
        return [...new Set(memories)];
    };

    // Функция для получения уникальных имен
    const getUniqueNames = (products) => {
        const names = products.map(product => product.name);
        return [...new Set(names)];
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        if (color) params.set('color', color);
        if (memory) params.set('memory', memory);
        if (name) params.set('name', name); // Добавляем имя в параметры поиска
        if (searchQuery) params.set('search', searchQuery);

        navigate(`/ProductsPage?${params.toString()}`);
    };

    // Фильтрация продуктов
    const filteredProducts = products.filter(product => {
        const priceCondition = 
            (minPrice === '' || product.price >= parseFloat(minPrice)) && 
            (maxPrice === '' || product.price <= parseFloat(maxPrice));
        const memoryCondition = memory === '' || product.memory === memory;
        const colorCondition = color === '' || product.color === color;
        const nameCondition = name === '' || product.name === name; // Добавляем условие для имени
        const searchCondition = product.name.toLowerCase().includes(searchQuery.toLowerCase());

        return priceCondition && memoryCondition && colorCondition && nameCondition && searchCondition;
    });

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchAllProducts();
                setProducts(fetchedProducts);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
                setError(e);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return <div>Загрузка товаров...</div>;
    }
    
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <Container className='mt-5'>
            <Row>
                <Col md={3}>
                    <h5>Фильтры</h5>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Модель</Form.Label>
                            <Form.Control as="select" value={name} onChange={(e) => setName(e.target.value)}>
                                <option value="">Все</option>
                                {getUniqueNames(products).map((nameOption, index) => (
                                    <option key={index} value={nameOption}>
                                        {nameOption}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formColor">
                            <Form.Label>Цвет</Form.Label>
                            <Form.Control as="select" value={color} onChange={(e) => setColor(e.target.value)}>
                                <option value="">Все</option>
                                {getUniqueColors(products).map((colorOption, index) => (
                                    <option key={index} value={colorOption}>
                                        {colorOption}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formMemory">
                            <Form.Label>Память</Form.Label>
                            <Form.Control as="select" value={memory} onChange={(e) => setMemory(e.target.value)}>
                                <option value="">Все</option>
                                {getUniqueMemories(products).map((memoryOption, index) => (
                                    <option key={index} value={memoryOption}>
                                        {memoryOption}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formPriceRange">
                            <Form.Label>Цена (от)</Form.Label>
                            <Form.Control type="number" placeholder="Минимум" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                            <Form.Label>Цена (до)</Form.Label>
                            <Form.Control className='mb-2' type="number" placeholder="Максимум" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSearch}>
                            Применить фильтры
                        </Button>
                    </Form>
                </Col>

                <Col md={9}>
                    <Row>
                        {filteredProducts.map(product => (
                            <Col md={4} key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductsPage;