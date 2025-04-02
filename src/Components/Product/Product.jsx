import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../api';
import EditProductForm from '../AdminMenu/EditProductForm';
import { useAuth } from '../AdminMenu/AuthProvider';
import OrderForm from './OrderForm';
import styled from 'styled-components';

const ProductPageContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    min-height: calc(100vh - var(--headerHeight, 0px));
    flex-wrap: wrap;
`;

const ProductImage = styled.div`
    display:flex;
    justify-content: center;
    width: 500px;
    height: 500px;
    overflow: hidden;
    margin-right: 20px;
    img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
;`
const ProductDetails = styled.div`
    margin-top: 40px;
    margin-left: 20px;
    max-width: 600px;
    text-align: justify; Серебро

;`

const Product = () => {
    const { token, checkAdmin, isAdmin } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await fetchProduct(id);
                setProduct(productData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    useEffect(() => {
        checkAdmin();
    }, [checkAdmin, token]);

    const handleUpdate = async (updatedProduct) => {
        try {
            const response = await updateProduct(id, updatedProduct, token);
            console.log('Response from server:', response);
            setProduct(response);
            setEditing(false);
            console.log('Товар успешно обновлен:', response);
        } catch (error) {
            console.error("Ошибка при обновлении товара:", error);
            setError(error.message || 'Ошибка при обновлении');
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleDelete = () => {
        navigate('/'); // Перенаправляем на главную страницу после удаления
    };

    if (loading) return <div>Загрузка товара...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;
    if (!product) return <div>Товар не найден</div>;

    return (
        <ProductPageContainer>
            <ProductImage>
                <img
                    src={`http://127.0.0.1/myApiLaravel/my-app/storage/app/public/${product.image}?t=${Date.now()}`}
                    alt={product.name}
                />
            </ProductImage>
            <ProductDetails>
                <h2>{product.name}</h2>
                <p><b>Цвет:</b> {product.color}</p>
                <p><b>Память:</b> {product.memory}</p>
                <p><b>Описание:</b><br />{product.description}</p>
                <p><b>Цена:</b> {Math.floor(product.price)} ₽</p>
                <button className="btn btn-outline-dark" onClick={() => setIsOrderFormVisible(!isOrderFormVisible)}>
                    Оформить заказ
                </button>

                {isAdmin && !editing && (
                    <button className='btn btn-outline-success ms-2' onClick={handleEditClick}>Редактировать</button>
                )}

                {editing && (
                    <EditProductForm
                        product={product}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete} // Передаем handleDelete в EditProductForm
                        token={token}
                        id={id}
                        loading={loading}
                    />
                )}

                {isOrderFormVisible && <OrderForm product={product} />}
            </ProductDetails>
        </ProductPageContainer>
    );
};

export default Product;