import React from 'react';
import styled from 'styled-components';
import { icon1, icon2, icon3, icon4 } from './icons'; // Импортируйте ваши иконки

const Container = styled.div`
    max-width: 1300px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-color: #fff; // Фоновый цвет блока
;`

const Title = styled.h2`
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
;`

const IconsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
        transition: transform 0.3s; // Плавный переход при изменении
        cursor: pointer;

        &:hover {
            transform: scale(1.3); // Увеличение при наведении
        }
    }

    img {
        width: 80px; // Ширина иконок
        height: auto; // Автоматическая высота для сохранения пропорций
    }
;`

const PartnerIcons: React.FC = () => {
    const icons = [
        { src: icon1, alt: 'Компания 1', link: 'https://www.credit-agricole.com/ru' },
        { src: icon2, alt: 'Компания 2', link: 'https://stripe.com/' },
        { src: icon3, alt: 'Компания 3', link: 'https://www.paypal.com/ru/home' },
        { src: icon4, alt: 'Компания 4', link: 'https://www.sberbank.ru/ru/person' },
    ];

    return (
        <Container>
            <Title>Мы сотрудничаем</Title>
            <IconsWrapper>
                {icons.map((icon, index) => (
                    <a href={icon.link} target="_blank" rel="noopener noreferrer" className="icon" key={index}>
                        <img src={icon.src} alt={icon.alt} />
                    </a>
                ))}
            </IconsWrapper>
        </Container>
    );
};

export default PartnerIcons;
