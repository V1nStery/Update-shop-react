import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { icon1, icon2, icon3, icon4 } from './icons';

const ContainerIcon = styled.div`
    border-radius: 20px;
    max-width: 1330px;
    text-align: center; // Центрируем текст внутри контейнера
;`

const Title = styled.h2`
    margin-bottom: 20px; // Отступ снизу для отделения от иконок
    font-size: 2.5rem; // Размер шрифта заголовка
;`

const StyledIconBlock = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    flex-wrap: wrap;

    .icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;

        &.large-icon {
            width: 70px;
            height: 70px;
        }
    }
        
;`

const IconBlock: React.FC = () => {
    const icons = [
        { icon: <img src={icon1} alt="Icon 1" />, text: 'Мы сотрудничаем с банками и кредитными компаниями' },
        { icon: <img src={icon2} alt="Icon 2" />, text: 'Вы можете запросить обратный звонок и наши специалисты постараются ответить на все ваши вопросы' },
        { icon: <img src={icon3} alt="Icon 3" />, text: 'Цены нашей продукции значительно ниже рыночной цены!' },
        { icon: <img src={icon4} alt="Icon 4" />, text: 'Мы предоставляем гарантию и высокое качество товаров' },
    ];

    return (
        <ContainerIcon className="container mt-5">
            <Title>Почему мы?</Title> {/* Заголовок добавлен здесь */}
            <StyledIconBlock>
                {icons.map((item, index) => (
                    <div className="icon-wrapper" key={index}>
                        {item.icon}
                        <span style={{maxWidth: '200px'}}><p>{item.text}</p></span>
                    </div>
                ))}
            </StyledIconBlock>
        </ContainerIcon>
    );
};

export default IconBlock;


