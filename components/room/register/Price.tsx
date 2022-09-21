import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';

import StageInfo from './StageInfo';
import Footer from './Footer';                                        


const Container = styled.div`
    display: flex;
    width: 100vw;
    height: calc(100vh - 80px);
    .selector-wrapper {
        position: relative;
        flex: 1;
        height: 100%;
        .price-input-wrapper {
            width: 500px;
            min-width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            .price-buttons {
                display: flex;
                align-items: center;
                justify-content: space-between;
                button {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 1px solid ${palette.gray_aa};
                    background-color: transparent;
                    font-size: 24px;
                    cursor: pointer;
                    &:disabled {
                        opacity: 0.3;
                        cursor: not-allowed;
                    }
                }
                input {
                    width: 300px;
                    height: 80px;
                    padding: 8px 12px;
                    border: 1px solid ${palette.gray_aa};
                    border-radius: 8px;
                    font-size: 1.6rem;
                    font-weight: bold;
                    text-align: center;
                    &.notValid {
                        outline-color: ${palette.bittersweet};
                        background-color: rgba(255,0,0,0.1);
                    }
                }
            }
            p {
                margin-top: 10px;
            }
            .errorText {
                margin-top: 10px;
                font-size: 12px;
                height: 20px;
                color: ${palette.bittersweet};
            }
        }
    }
`;


const MIN_PRICE = 13920;
const MAX_PRICE = 13919259;
const STEP_PRICE = 1000;

const Price: React.FC = () => {
    
    const router = useRouter();
    
    const { price: storedPrice, setPrice } = useRegisterRoomStore(
        (state) => ({ price: state.price, setPrice: state.setPrice })
        , shallow
    );

    const [value, setValue] = useState<number>(0);
    const [isValid, setIsValid] = useState<boolean>(false);

    useLayoutEffect(() => {
        {!!storedPrice && setValue(storedPrice)}
    }, [storedPrice])

    useLayoutEffect(() => {
        if (value >= MIN_PRICE && value <= MAX_PRICE) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [value])


    const onClickMinus = () => {
        setValue(state => (state - STEP_PRICE >= MIN_PRICE ? state - STEP_PRICE : MIN_PRICE))
    }

    const onClickPlus = () => {
        setValue(state => (state + STEP_PRICE <= MAX_PRICE ? state + STEP_PRICE : MAX_PRICE))
    }


    const onChangePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const priceText = Number(value.replace('₩',''));
        if (!isNaN(priceText)) {
            setValue(priceText);
        }
    }
    
    const onClickNextButton = () => {
        if (!!value) {
            setPrice(value);
            // router.push('/room/register/price')
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    이제 요금을 설정하실 차례입니다.
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <div className="price-input-wrapper">
                    <div className='price-buttons'>
                        <button disabled={value <= MIN_PRICE} onClick={onClickMinus} >-</button>
                        <input 
                            type={'text'}
                            value={`₩${value}`}
                            onChange={onChangePriceInput}
                            className={!isValid ? 'notValid' : undefined}
                         />
                        <button disabled={value >= MAX_PRICE} onClick={onClickPlus}>+</button>
                    </div>
                    <p>/박</p>
                    <div className='errorText'>{!isValid && '*기본 요금으로 ₩13,920~₩13,919,259 사이의 값을 입력해 주세요.'}</div>
                </div>
                <Footer step={10} prevHref='/room/register/description' isValid={isValid} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Price;