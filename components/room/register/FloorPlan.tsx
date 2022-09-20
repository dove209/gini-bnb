import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';

import CounterMinusIcon from '../../../public/static/svg/common/counter/counter_minus.svg';
import CounterPlusIcon from '../../../public/static/svg/common/counter/counter_plus.svg';


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
        .selector-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 464px;
            .count-selector {
                li {
                    display: flex;
                    align-content: center;
                    justify-content: space-between;
                    padding: 16px 0px;
                    h1 {
                        display: flex;
                        align-items:center;
                        font-size: 1.6rem;
                        font-weight: bold;
                    }
                    .count-button-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 22%;
                        button {
                            width: 32px;
                            height: 32px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            border: 1px solid ${palette.black};
                            color: ${palette.black};
                            background-color: transparent;
                            outline: none;
                            cursor: pointer;
                            font-size: 21px;
                            &:disabled {
                                opacity: 0.3;
                                cursor: not-allowed;
                            }
                        }
                    }
                }
                li + li {
                    margin-top: 8px;
                }
            }

            .radio-selector {
                margin-top: 32px;
                & > p {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 16px;
                }
                li {
                    padding: 8px 0px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    span {
                        width: 22px;
                        height: 22px;
                        border: 1px solid ${palette.black};
                        border-radius: 50%;
                        position: relative;
                        &.active {
                            background-color: black;
                        }
                        &::after {
                            content: '';
                            width: 8px;
                            height: 8px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background-color: white;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }
`;



const FloorPlan: React.FC = () => {
    const router = useRouter();
    const { maximumGuestCount, bedroomCount, bedCount, bathroomCount, bathroomType, setFloorPlan } = useRegisterRoomStore(
        (state) => ({ 
            maximumGuestCount: state.maximumGuestCount,
            bedroomCount: state.bedroomCount,
            bedCount: state.bedCount,
            bathroomCount: state.bathroomCount,
            bathroomType: state.bathroomType,
            setFloorPlan: state.setFloorPlan
        }),
        shallow
    );
    
    const [maxGuestCnt, setMaxGestCnt] = useState<number>(0);
    const [bedroomCnt, setBedroomCnt]  = useState<number>(0);
    const [bedCnt, setBedCnt] = useState<number>(0);
    const [bathroomCnt, setBathroomCnt] = useState<number>(0);
    const [isPrivate, setIsPrivate] = useState<'private' | 'public'>('private');



    useLayoutEffect(() => {
        {!!maximumGuestCount && setMaxGestCnt(maximumGuestCount)};
        {!!bedroomCount && setBedroomCnt(bedroomCount)};
        {!!bedCount && setBedCnt(bedCount)};
        {!!bathroomCount && setBathroomCnt(bathroomCount)};
        {!!bathroomType && setIsPrivate(bathroomType)};
    },[maximumGuestCount, bedroomCount, bedCount, bathroomCount, bathroomType])

    const onClickNextButton = () => {
        setFloorPlan({
            maximumGuestCount: maxGuestCnt,
            bedroomCount: bedroomCnt,
            bedCount: bedCnt,
            bathroomCount: bathroomCnt,
            bathroomType: isPrivate,
        })
        router.push('/room/register/location')
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                숙소에서 맞이할 최대 인원수를<br />
                알려주세요.
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <div className='selector-box'>
                    <ul className='count-selector'>
                        <li>
                            <h1>게스트</h1>
                            <div className='count-button-wrapper'>
                                <button 
                                    type='button'
                                    onClick={() => setMaxGestCnt(state => state - 1)}
                                    disabled={maxGuestCnt <= 1}
                                >
                                    <CounterMinusIcon />
                                </button>
                                <div>{maxGuestCnt}</div>
                                <button 
                                    type='button'
                                    onClick={() => setMaxGestCnt(state => state + 1)}
                                    disabled={maxGuestCnt >= 16}>
                                    <CounterPlusIcon />
                                </button>
                            </div>
                        </li>
                        <li>
                            <h1>침실</h1>
                            <div className='count-button-wrapper'>
                            <button 
                                    type='button'
                                    onClick={() => setBedroomCnt(state => state - 1)}
                                    disabled={bedroomCnt <= 1}
                                >
                                    <CounterMinusIcon />
                                </button>
                                <div>{bedroomCnt}</div>
                                <button 
                                    type='button'
                                    onClick={() => setBedroomCnt(state => state + 1)}
                                    disabled={bedroomCnt >= 50}>
                                    <CounterPlusIcon />
                                </button>
                            </div>
                        </li>
                        <li>
                            <h1>침대</h1>
                            <div className='count-button-wrapper'>
                            <button 
                                    type='button'
                                    onClick={() => setBedCnt(state => state - 1)}
                                    disabled={bedCnt <= 0}
                                >
                                    <CounterMinusIcon />
                                </button>
                                <div>{bedCnt}</div>
                                <button 
                                    type='button'
                                    onClick={() => setBedCnt(state => state + 1)}
                                    disabled={bedCnt >= 50}>
                                    <CounterPlusIcon />
                                </button>
                            </div>
                        </li>
                        <li>
                            <h1>욕실</h1>
                            <div className='count-button-wrapper'>
                            <button 
                                    type='button'
                                    onClick={() => setBathroomCnt(state => state - 0.5)}
                                    disabled={bathroomCnt <= 0.5}
                                >
                                    <CounterMinusIcon />
                                </button>
                                <div>{bathroomCnt}</div>
                                <button 
                                    type='button'
                                    onClick={() => setBathroomCnt(state => state + 0.5)}
                                    disabled={bathroomCnt >= 50}>
                                    <CounterPlusIcon />
                                </button>
                            </div>
                        </li>
                    </ul>   

                    
                    <div className='radio-selector'>
                        <p>게스트가 단독으로 사용하는 욕실이 있나요?</p>
                        <ul>
                            <li onClick={() => setIsPrivate('private')}>
                                <h1>예</h1>
                                <span className={isPrivate === 'private' ? 'active' : undefined}></span>
                            </li>
                            <li onClick={() => setIsPrivate('public')}>
                                <h1>아니요, 모두 공용입니다.</h1>
                                <span className={isPrivate === 'public' ? 'active' : undefined}></span>
                            </li>
                        </ul>
                    </div>
                </div>
     
                <Footer step={4} prevHref='/room/register/privacy-type' isValid={true} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default FloorPlan;