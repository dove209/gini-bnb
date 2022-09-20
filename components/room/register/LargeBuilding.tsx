import React, {  useLayoutEffect, useState } from 'react';
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
            max-height: calc(100% - 160px);
            overflow: auto;
            -ms-overflow-style: none; 
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
            li {
                height: 90px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border: 2px solid ${palette.gray_ed};
                border-radius: 12px;
                font-weight: bold;
                font-size: 18px;
                white-space: pre-wrap;
                cursor: pointer;
                &:hover {
                    border-color: ${palette.black};
                }
                &.selected {
                    border-color: ${palette.black};
                    background-color: ${palette.gray_f7}
                }
            }
            li + li {
                margin-top: 10px;
            }
        }
    }
`;



const LargeBuilding: React.FC = () => {
    const router = useRouter();
    const { largeBuildingType: storedLargeBuildingType, setLargBuildingType } = useRegisterRoomStore(
        (state) => ({ 
            largeBuildingType: state.largeBuildingType,
            setLargBuildingType: state.setLargeBuildingType
         }),
         shallow
    );
    
    const [largeBuilding, setLargeBuilding] = useState<string>(''); // 숙소 유형 선택


    useLayoutEffect(() => {
        setLargeBuilding(storedLargeBuildingType)
    },[storedLargeBuildingType])

    const onClickNextButton = () => {
        if(!!largeBuilding) {
            setLargBuildingType(largeBuilding);
            router.push('/room/register/building')
        }
    }

    return (
        <Container>
            <StageInfo>
                <h1>호스팅할 숙소 유형을 알려주세요.</h1>
            </StageInfo>
            <div className='selector-wrapper'>
                <ul>
                    {largeBuildingTypeList.map((option, index) => (
                        <li  
                            key={index}
                            className={option.type === largeBuilding ? 'selected' : ''}
                            onClick={() => setLargeBuilding(option.type)}
                        >
                            <span>{option.type}</span>
                            <Image src={option.imgSrc} width={56} height={56} alt='' />
                        </li>
                    ))}
                </ul>
                <Footer step={1} prevHref='/' isValid={!!largeBuilding} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default LargeBuilding