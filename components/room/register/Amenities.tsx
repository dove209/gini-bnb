import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { convenienceList, popularConvenienceList, safetyGoodsList } from '../../../lib/staticData';
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
        .content-box {
            position: absolute;
            top: 48%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: calc(100% - 160px);
            padding: 0 20% 40px;
            overflow: auto;
            -ms-overflow-style: none; 
            scrollbar-width: none;
            &::-webkit-scrollbar {
                width: 0;
            }
        }
    }
`;

const CheckBoxWrapper = styled.ul<{ length: number }>`
    h1 { 
        font-weight: bold;
        font-size: 1.5rem;
    }
    ul {
        margin-top: 15px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: ${({ length }) => ( `repeat(${Math.ceil(length / 3)}, minmax(148px, auto))` )};
        gap: 16px;
        li {
            display: flex;
            align-items: center;
            justify-content:center;
            border: 1px solid ${palette.gray_ed};
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            &.selected {
                border-color: ${palette.black};
                background-color: ${palette.gray_f7}
            }
        }
    }
    & + & {
        margin-top: 30px;
    }
`



const Amenities: React.FC = () => {
    const router = useRouter();
    const { 
        conveniences: storedConveniences,
        popularConveniences: storedPopularConveniences,
        safetyGoods: storedSafetyGoods,
        setRegisterRoom 
    } = useRegisterRoomStore(
        (state) => ({
            conveniences: state.conveniences,
            popularConveniences: state.popularConveniences,
            safetyGoods: state.safetyGoods,
            setRegisterRoom: state.setRegisterRoom 
        }),
        shallow
    );
    
    const [conveniences, setConveniences] = useState<string[]>([]);
    const [popularConveniences, setPopularConveniences] = useState<string[]>([]);
    const [safetyGoods, setSafetyGoods] = useState<string[]>([]);

    useEffect(() => {
        {!!storedConveniences && setConveniences([...storedConveniences])}
        {!!storedPopularConveniences && setPopularConveniences([...storedPopularConveniences])}
        {!!storedSafetyGoods && setSafetyGoods([...storedSafetyGoods])}
    },[storedConveniences, storedPopularConveniences, storedSafetyGoods])

    const onClickNextButton = () => {
        setRegisterRoom({
            conveniences,
            popularConveniences,
            safetyGoods
        })
        // router.push('/room/register/floor-plan')
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    숙소 편의시설 정보를 추가해 주세요.
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <div className="content-box">
                    <CheckBoxWrapper length={convenienceList.length}>
                        <h1>특별히 내세울 만한 편의시설이 있나요?</h1>
                        <ul data-length={9}>
                            {convenienceList.map((option, index) => (
                                <li 
                                    key={index} 
                                    className={conveniences.includes(option) ? 'selected' : undefined}
                                    onClick={() => conveniences.includes(option) ? setConveniences(conveniences.filter(item => item !== option)) : setConveniences([...conveniences, option])}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </CheckBoxWrapper>

                    <CheckBoxWrapper length={popularConvenienceList.length}>
                        <h1>다음 인기 편의시설이 있나요?</h1>
                        <ul data-length={popularConvenienceList.length}>
                            {popularConvenienceList.map((option, index) => (
                                <li 
                                    key={index} 
                                    className={popularConveniences.includes(option) ? 'selected' : undefined}
                                    onClick={() => popularConveniences.includes(option) ? setPopularConveniences(popularConveniences.filter(item => item !== option)) : setPopularConveniences([...popularConveniences, option])}
                                >
                                 {option}
                             </li>
                            ))}
                        </ul>
                    </CheckBoxWrapper>

                    <CheckBoxWrapper length={safetyGoodsList.length}>
                        <h1>다음 안전 물품이 있나요?</h1>
                        <ul data-length={safetyGoodsList.length}>
                            {safetyGoodsList.map((option, index) => (
                                <li 
                                    key={index} 
                                    className={safetyGoods.includes(option) ? 'selected' : undefined}
                                    onClick={() => safetyGoods.includes(option) ? setSafetyGoods(safetyGoods.filter(item => item !== option)) : setSafetyGoods([...safetyGoods, option])}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </CheckBoxWrapper>
                </div>

                <Footer step={6} prevHref='/room/register/location' isValid={true} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Amenities;