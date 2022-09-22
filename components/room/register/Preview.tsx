import React, { useLayoutEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';
import { registerRoomAPI } from '../../../lib/api/room';
import { RegisterRoomState } from '../../../types/room';

import CheckMarkIcon from '../../../public/static/svg/register/dark_cyan_check_mark.svg';
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
        .preview-wrapper {
            width: 500px;
            min-width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            li {
                width: 100%;
                cursor: pointer;
                & > div {
                    width: 100%;
                    height: 100%;
                    border: 1px solid ${palette.dark_cyan};
                    border-radius: 5px;
                    padding: 20px 20px;
                    display:flex;
                    align-items: center;
                    font-size: 1.3rem;
                    color: ${palette.dark_cyan};
                    svg { 
                        margin-right: 10px;
                    }            
                    &.not-active {
                        border-color: ${palette.bittersweet};
                        color: ${palette.gray_aa};
                        h1 {
                            margin-left: 26px;
                        }
                    }
                }
    
            }
            li + li {
                margin-top: 20px;
            }
        }
    }
`;


const Preview: React.FC = () => {
    const router = useRouter();
    
    const {
        largeBuildingType,
        buildingType,
        roomType,
        maximumGuestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        bathroomType,
        country,
        city,
        district,
        streetAddress,
        detailAddress,
        postcode,
        latitude,
        longitude,
        conveniences,
        popularConveniences,
        safetyGoods,
        photos,
        title,
        description,
        price,
        hostId
    } = useRegisterRoomStore();

    const [isLargeBuildingType, setIsLargeBuildingType] = useState<boolean>(false);
    const [isBuildingType, setIsBuildingType] = useState<boolean>(false);
    const [isRoomType, setIsRoomType] = useState<boolean>(false);
    const [isLocation, setIsLocation] = useState<boolean>(false);
    const [isPhotos, setIsPhotos] = useState<boolean>(false);
    const [isTitle, setIsTitle] = useState<boolean>(false);
    const [isDescription, setIsDescription] = useState<boolean>(false);
    const [isPrice, setIsPrice] = useState<boolean>(false);

    useLayoutEffect(() => {
        setIsLargeBuildingType(!!largeBuildingType);
        setIsBuildingType(!!buildingType);
        setIsRoomType(!!roomType);
        setIsLocation(!!country && !!city && !!district && !! streetAddress && !!postcode && !!latitude && !!longitude);
        setIsPhotos(photos.length !== 0);
        setIsTitle(!!title);
        setIsDescription(!!description);
        setIsPrice(!!price);
    }, [])
    
    
    const onClickSubmitButton = async () => {
        if (isLargeBuildingType && isBuildingType && isRoomType && isLocation && isPhotos && isTitle && isDescription && isPrice) {
            try {
                const registerRoomBody: RegisterRoomState = {
                    largeBuildingType,
                    buildingType,
                    roomType,
                    maximumGuestCount,
                    bedroomCount,
                    bedCount,
                    bathroomCount,
                    bathroomType,
                    country,
                    city,
                    district,
                    streetAddress,
                    detailAddress,
                    postcode,
                    latitude,
                    longitude,
                    conveniences,
                    popularConveniences,
                    safetyGoods,
                    photos,
                    title,
                    description,
                    price,
                    hostId
                }
                await registerRoomAPI(registerRoomBody);
                localStorage.removeItem('register-room');
                router.push('/')
            } catch (error) {
                console.log(error);
                alert('숙소 등록이 실패 하였습니다.')
            }
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>
                    새로운 숙소 페이지를 확인하세요!
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <ul className="preview-wrapper">
                    <li>
                        {isLargeBuildingType
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>숙소 유형 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.replace('/room/register/large-building')}>
                                <h1>숙소 유형 등록 미완료</h1>
                            </div>
                        }
                    </li>
                    <li>
                        {isBuildingType
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>숙소 종류 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.replace('/room/register/building')}>
                                <h1>숙소 종류 등록 미완료</h1>
                            </div>
                        }
                    </li>
                    <li>
                        {isRoomType
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>방 타입 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.replace('/room/register/privacy-type')}>
                                <h1>방 타입 등록 미완료</h1>
                            </div>
                        }
                    </li>
                    <li>
                        {isLocation
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>숙소 위치 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.replace('/room/register/location')}>
                                <h1>숙소 위치 등록 미완료</h1>
                            </div>
                        }
                    </li>
                    <li>
                        {isPhotos
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>숙소 사진 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.replace('/room/register/photos')}>
                                <h1>숙소 사진 등록 미완료</h1>
                            </div>
                        }
                    </li>
                    <li>
                        {isTitle
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>숙소 제목 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.replace('/room/register/title')}>
                                <h1>숙소 제목 등록 미완료</h1>
                            </div>
                        }
                    </li>
                    <li>
                        {isDescription
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>숙소 설명 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.replace('/room/register/price')}>
                                <h1>숙소 설명 등록 미완료</h1>
                            </div>
                        }
                    </li>
                    <li>
                        {isPrice
                        ?
                            <div>
                                <CheckMarkIcon />
                                <h1>숙소 가격 등록 완료</h1>
                            </div>
                        :
                            <div className='not-active' onClick={() => router.push('/room/register/preview')}>
                                <h1>숙소 가격 등록 미완료</h1>
                            </div>
                        }
                    </li>
                </ul>
                <Footer step={11} prevHref='/room/register/price' isValid={isLargeBuildingType && isBuildingType && isRoomType && isLocation && isPhotos && isTitle && isDescription && isPrice} >
                    <button className={'finish-button'} onClick={onClickSubmitButton}>숙소 저장하기</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Preview;