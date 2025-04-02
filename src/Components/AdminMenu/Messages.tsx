import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; // Для локализации на русский язык

const Messages = () => {
    const [orders, setOrders] = useState([]);
    const [callbacks, setCallbacks] = useState([]);
    const [processedOrders, setProcessedOrders] = useState({});
    const [processedCallbacks, setProcessedCallbacks] = useState({});

    useEffect(() => {
        const fetchCallbacks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1/myApiLaravel/my-app/public/api/callbacks');
                setCallbacks(response.data);
                const processed = response.data.reduce((acc, callback) => {
                    if (callback.processed) {
                        acc[callback.id] = true;
                    }
                    return acc;
                }, {});
                setProcessedCallbacks(processed);
            } catch (error) {
                console.error('Ошибка при загрузке сообщений:', error);
            }
        };

        fetchCallbacks();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1/myApiLaravel/my-app/public/api/orders');
                setOrders(response.data);
                const processed = response.data.reduce((acc, order) => {
                    if (order.processed) {
                        acc[order.id] = true;
                    }
                    return acc;
                }, {});
                setProcessedOrders(processed);
            } catch (error) {
                console.error('Ошибка при загрузке заказов:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleProcessedStatus = async (orderId) => {
        try {
            const response = await axios.put(`http://127.0.0.1/myApiLaravel/my-app/public/api/orders/${orderId}/processed`, {
                processed: true,
            });
            setProcessedOrders((prev) => ({
                ...prev,
                [orderId]: true,
            }));
        } catch (error) {
            console.error('Ошибка при обновлении статуса заказа:', error);
        }
    };

    const handleCallbackProcessedStatus = async (callbackId) => {
        try {
            const response = await axios.put(`http://127.0.0.1/myApiLaravel/my-app/public/api/callbacks/${callbackId}/processed`, {
                processed: true,
            });
            setProcessedCallbacks((prev) => ({
                ...prev,
                [callbackId]: true,
            }));
        } catch (error) {
            console.error('Ошибка при обновлении статуса обратного звонка:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className='mt-4 text-center mb-4'>Сообщения от пользователей для покупки товара</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Город</th>
                            <th>Телефон</th>
                            <th>Email</th>
                            <th>Товар</th>
                            <th>Цена</th>
                            <th>Цвет</th>
                            <th>Память</th>
                            <th>Дата добавления</th>
                            <th>Обработан</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className={processedOrders[order.id] ? 'table-secondary' : ''}>
                                <td>{order.first_name}</td>
                                <td>{order.last_name}</td>
                                <td>{order.city}</td>
                                <td>{order.phone}</td>
                                <td>{order.email}</td>
                                <td>{order.product_name}</td>
                                <td>{Math.floor(order.product_price)}&nbsp;₽</td>
                                <td>{order.product_color}</td>
                                <td>{order.product_memory}</td>
                                <td>{format(new Date(order.created_at), 'dd.MM.yyyy HH:mm', { locale: ru })}</td>
                                <td className='text-center'>
                                    <input
                                        type="checkbox"
                                        checked={processedOrders[order.id] || false}
                                        onChange={() => handleProcessedStatus(order.id)}
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className='text-center mb-4 mt-5'>Сообщения от пользователей для обратного звонка</h2>
            <div className="table-responsive">
                <table className="table table-striped mb-5">
                    <thead>
                        <tr className='text-center'>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Дата добавления</th>
                            <th className='text-center'>Обработан</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {callbacks.map((callback) => (
                            <tr key={callback.id} className={processedCallbacks[callback.id] ? 'table-secondary' : ''}>
                                <td>{callback.name}</td>
                                <td>{callback.phone}</td>
                                <td>{format(new Date(callback.created_at), 'dd.MM.yyyy HH:mm', { locale: ru })}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={processedCallbacks[callback.id] || false}
                                        onChange={() => handleCallbackProcessedStatus(callback.id)}
                                        style={{ width: '20px', height: '20px' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Messages;