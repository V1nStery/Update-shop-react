import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const StyledAbout = styled.div`
    background-color: white; /* Цвет фона для контейнера */
    padding: 2rem; /* Отступы внутри контейнера */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Тень */
    border-radius: 20px; /* Радиус границ */
    max-width: 1300px; /* Максимальная ширина */
    margin: auto; /* Центрирование контейнера */
;`

const About = () => {
    return (
        <StyledAbout className="mt-5">
            <h2 className="text-center">О нас</h2>
            <p className="text-center">Мы — команда профессионалов, готовых помочь вам с вашими проектами.</p>

            <div className="row mt-4">
                <div className="col-md-4 text-center">
                    <h4>Контакты</h4>
                    <ul className="list-unstyled">
                        <li>
                            <strong>Email:</strong> info@example.com
                        </li>
                        <li>
                            <strong>Телефон:</strong> +1 (234) 567-890
                        </li>
                        <li>
                            <strong>Адрес:</strong> ул. Примерная, д. 1, г. Примерск
                        </li>
                    </ul>
                </div>

                <div className="col-md-4 text-center">
                    <h4>Социальные сети</h4>
                    <ul className="list-unstyled">
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">VK</a>
                        </li>
                    </ul>
                </div>

                <div className="col-md-4 text-center">
                    <h4>Часы работы</h4>
                    <ul className="list-unstyled">
                        <li>Понедельник - Воскресенье: с 8:00 до 20:00</li>
                    </ul>
                </div>
            </div>
        </StyledAbout>
    );
};

export default About;
