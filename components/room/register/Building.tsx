import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import Image from 'next/image';
import shallow from 'zustand/shallow';

import { largeBuildingTypeList } from '../../../lib/staticData';
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

        ul {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50%;
            li {
                height: 10vh;
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



const Building: React.FC = () => {
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
            <StageInfo>
                <h1>
                    다음 중 숙소를 가장 잘<br />
                    설명하는 문구는 무었인가요?
                </h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <ul>
                    {largeBuildingTypeList.map((option, index) => (
                        <li className={option.type === largeBuildingType ? 'selected' : ''} key={index} onClick={() => setLargeBuildingType(option.type)}>
                            <span>{option.type}</span>
                            <Image src={option.imgSrc} width={56} height={56} alt='' />
                        </li>
                    ))}
                </ul>
                <Footer prevHref='/' isValid={!!largeBuildingType} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Building