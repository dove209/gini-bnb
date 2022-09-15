import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import Image from 'next/image';
import shallow from 'zustand/shallow';

import { largeBuildingTypeList } from '../../../lib/staticData';
import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';

import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: calc(100vh - 80px);
    .stage-info {
        position: relative;
        flex: 1;
        height: 100%;
        background: url('/static/image/registerRoomBackground.jpg') no-repeat center;
        background-size: cover;
        h1 {
            color: white;
            font-weight: bold;
            font-size: 3rem;
            position: absolute;
            top: 50%;
            left: 5%;
            transform: translateY(-50%);
        }
    }

    .selector-wrapper {
        position: relative;
        flex: 1;
        height: 100%;

        ul {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            li {
                width: 464px;
                height: 90px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border: 1px solid ${palette.gray_ed};
                border-radius: 12px;
                font-weight: bold;
                font-size: 18px;
                cursor: pointer;

                &:hover, &.selected {
                    border: 2px solid ${palette.black};
                }
            }
            li + li {
                margin-top: 10px;
            }
        }
    }
`;



const RegisterRoomBuilding: React.FC = () => {
    const router = useRouter();
    const { largeBuildingType: storedLargeBuildingType, setRegisterRoom } = useRegisterRoomStore(
        (state) => ({ largeBuildingType: state.largeBuildingType, setRegisterRoom: state.setRegisterRoom })
        ,shallow
    );
    
    const [largeBuildingType, setLargeBuildingType] = useState<string | null>(); // 숙소 유형 선택


    useEffect(() => {
        setLargeBuildingType(storedLargeBuildingType)
    },[storedLargeBuildingType])

    const onClickNextButton = () => {
        if(!!largeBuildingType) {
            setRegisterRoom({
                largeBuildingType
            })
            router.push('/room/register/bedrooms')
        }
    }

    return (
        <Container>
            <div className='stage-info'>
                <h1>호스팅할 숙소 유형을 알려주세요.</h1>
            </div>
            <div className='selector-wrapper'>
                <ul>
                    {largeBuildingTypeList.map((option, index) => (
                        <li className={option.type === largeBuildingType ? 'selected' : ''} key={index} onClick={() => setLargeBuildingType(option.type)}>
                            <span>{option.type}</span>
                            <Image src={option.imgSrc} width={56} height={56} alt='' />
                        </li>
                    ))}
                </ul>
                <RegisterRoomFooter prevHref='/' isValid={!!largeBuildingType} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </RegisterRoomFooter>
            </div>
        </Container>
    )
}

export default RegisterRoomBuilding