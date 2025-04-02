import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const OrderForm = ({ product }) => {
    const [contactMethod, setContactMethod] = useState('');
    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        city: '',
        phone: '',
        email: '',
    });

    const handleContactMethodChange = (e) => {
        setContactMethod(e.target.value);
        setShowPhoneInput(e.target.value === 'phone');
        setShowEmailInput(e.target.value === 'email');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const orderData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            city: formData.city,
            phone: formData.phone,
            email: formData.email,
            product_name: product.name,
            product_price: product.price,
            product_id: product.id,
            product_color: product.color, // Добавляем цвет
            product_memory: product.memory, // Добавляем память
            product_description: product.description, // Добавляем описание
        };
    
        try {
            const response = await axios.post('http://127.0.0.1/myApiLaravel/my-app/public/api/orders', orderData);
            console.log('Заказ успешно создан:', response.data);
            alert('Заказ успешно оформлен! Первый освободишься специалист с вами свяжется,как можно быстрее');
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            alert('Произошла ошибка при оформлении заказа.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h2>Заказ товара: {product.name}</h2>
            <p>Память {product.memory}</p>
            <p>Цвет: {product.color}</p>
            <p>Цена: {Math.floor(product.price)} $</p>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">Имя</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Фамилия</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">Город</label>
                <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Как с вами удобно связаться?</label>
                <div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="contactMethod" id="contactPhone" value="phone" checked={contactMethod === 'phone'} onChange={handleContactMethodChange} />
                        <label className="form-check-label" htmlFor="contactPhone">По телефону</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="contactMethod" id="contactEmail" value="email" checked={contactMethod === 'email'} onChange={handleContactMethodChange} />
                        <label className="form-check-label" htmlFor="contactEmail">По Email</label>
                    </div>
                </div>
            </div>
            {showPhoneInput && (
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Номер телефона</label>
                    <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
            )}
            {showEmailInput && (
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
            )}
            <button type="submit" className="btn btn-outline-success">Оформить</button>
        </form>
    );
};

export default OrderForm;