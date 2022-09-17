import React, {  useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import { Map } from 'react-kakao-maps-sdk';

import { privacyTypeList } from '../../../lib/staticData';
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
        .map-wrapper {
            position: relative;
            width: 100%;
            height: calc(100% - 80px);
            .input-wrapper {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 63%;
                height: 600px;
                background-color: white;
                border-radius: 16px;
                padding: 32px 24px;
                z-index: 1;
                h1 {
                    text-align: center;
                    font-weight: bold;
                    font-size: 18px;
                }
            }
        }
        ul {
            margin-top: 40px;
            /* border-radius: 12px; */
            li {
                position: relative;
                height: 52px;
                width: 100%;
                p {
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                input { 
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 12px 12px 0px 0px;
                    outline: none;
                    background-color: transparent;
                    &:focus {
                        outline: none;
                        border-radius: 10px;
                        width: 100%;
                        border: 2px solid ${palette.black}
                    }
                }
            }
        }
    }
`;



const Location: React.FC = () => {
    const router = useRouter();
    const { roomType: storedRoomType, setRegisterRoom } = useRegisterRoomStore(
        (state) => ({ roomType: state.roomType, setRegisterRoom: state.setRegisterRoom })
        ,shallow
    );
    
    const [roomType, setRoomType] = useState<string | null>(); // 숙소의 종류 선택

    const [curCoords, setCurCoords] = useState({
        lat: 33.450701,
        lng: 126.570667
    })


    useEffect(() => {
        setRoomType(storedRoomType)
    },[storedRoomType])

    useLayoutEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurCoords({
                ...curCoords,
                lat: latitude,
                lng: longitude
            })
        })
    })

    const onClickNextButton = () => {
        if(!!roomType) {
            setRegisterRoom({
                roomType
            })
            // router.push('/room/register/')
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    숙소 위치는 어디인가요?
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <div className='map-wrapper'>
                    <Map
                        center={{ ...curCoords }}
                        style={{ width: "100%", height: "100%" }}
                        draggable={false}
                        zoomable={false}
                        scrollwheel={false}
                        disableDoubleClick={true}
                        disableDoubleClickZoom={true}
                        level={12}
                    />
                    <div className='input-wrapper'>
                        <h1>주소를 입력하세요.</h1>
                        <ul>
                            <li>
                                {/* <p>주소</p> */}
                                <input type="text" />
                            </li>
                        </ul>
                    </div>
                </div>
                <Footer step={5} prevHref='/room/register/floor-plan' isValid={!!roomType} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Location;