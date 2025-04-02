import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #282c34; // Цвет фона футера
    color: white; // Цвет текста
    padding: 20px; // Отступы
    border-radius: 20px; // Радиус границ
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); // Тень
    text-align: center; // Центрирование текста
    margin-top: 40px; // Отступ сверху для отделения от контента
    max-width: 1300px;
    margin: 0 auto;
;`

const FooterText = styled.p`
    margin: 0; // Убираем отступы
;`

const FooterLink = styled.a`
    color: #61dafb; // Цвет ссылок
    text-decoration: none; // Убираем подчеркивание
    &:hover {
        text-decoration: underline; // Подчеркивание при наведении
    }
;`

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterText>&copy; {new Date().getFullYear()} Update</FooterText>
            <FooterText>
                <FooterLink href="https://example.com" target="_blank" rel="noopener noreferrer">
                    Политика конфиденциальности
                </FooterLink>
            </FooterText>
        </FooterContainer>
    );
};

export default Footer;
