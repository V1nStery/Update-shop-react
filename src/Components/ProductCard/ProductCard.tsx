import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

export const CardContainer = styled.div`
    margin: 16px;
    display: flex; // Центрируем по горизонтали
    justify-content: center;
    padding: 20px 10px;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        .card {
        border:none;
        }
`;

const ImgContainer = styled.div`
    max-width: 300px; 
    height: 300px; // Фиксированная высота картинки
    overflow: hidden; // Обрезаем картинку, если она больше контейнера
    display: flex; // Центрируем картинку внутри контейнера
    align-items: center;
    justify-content: center;
`;

const ProductImage = styled.img`
    max-width: 100%; // Картинка занимает всю ширину контейнера
    max-height: 90%; // Картинка занимает всю высоту контейнера
    display: block; // Убираем лишние отступы
`;



const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewProduct = () => {
        navigate(`/Product/${product.id}`); // Перейти на страницу товара по ID
    };

    return (
        <CardContainer className="col-lg-10">
            <div className='card'>
                <ImgContainer>
                    <ProductImage src={`http://127.0.0.1/myApiLaravel/my-app/storage/app/public/${product.image}`} alt={product.name} className="card-img-top" />
                </ImgContainer>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Цвет: {product.color}</p>
                <p className="card-text">Память: {product.memory}</p>
                <p className="card-text">Цена: {Math.floor(product.price)} ₽</p>
                <button className="btn btn-outline-dark rounded-4" onClick={handleViewProduct}>
                    Перейти к товару
                </button>
            </div>
        </CardContainer>
    );
};

export default ProductCard;
