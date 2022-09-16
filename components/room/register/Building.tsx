import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { apartmentBuildingTpyeList, houstBuildingTypeList, secondaryUnitBuildingTypeList, bnbBuildingTypeList, uniqueSpaceBuildingTypeList, boutiquesHotelBuildingTypeList } from '../../../lib/staticData';
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
                padding: 24px;
                border: 2px solid ${palette.gray_ed};
                border-radius: 12px;
  
                cursor: pointer;
                &:hover, &.selected {
                    border-color: ${palette.black};
                }
                h1 {
                    font-weight: bold;
                    font-size: 18px;
                }
                & > p {
                    margin-top: 8px;
                    color: ${palette.gray_aa};
                    font-size: 14px;
                    line-height: 20px;
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
    
    const [buildingTypeList, setBuildingTypeList] = useState<{ type:string; description?: string; }[]>([]);
    const [buildingType, setBuildingType] = useState<string | null>(); // 숙소 유형 선택


    useEffect(() => {
        switch(storedLargeBuildingType){
            case '아파트':
                setBuildingTypeList([...apartmentBuildingTpyeList])
                break
            case '주택':
                setBuildingTypeList([...houstBuildingTypeList])
                break
            case '별채':
                setBuildingTypeList([...secondaryUnitBuildingTypeList])
                break
            case '독특한 숙소':
                setBuildingTypeList([...uniqueSpaceBuildingTypeList])
                break
            case 'B&B':
                setBuildingTypeList([...bnbBuildingTypeList])
                break
            case '부티크호텔':
                setBuildingTypeList([...boutiquesHotelBuildingTypeList])
                break                                     
            default:
                // 전 단계로 이동
                router.replace('/room/register/large-building')
                break
        }
    },[storedLargeBuildingType])

    const onClickNextButton = () => {
        if(!!buildingType) {
            setRegisterRoom({
                buildingType
            })
            router.push('/room/register/bedrooms');
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
                    {buildingTypeList.map((option, index) => (
                        <li className={option.type === buildingType ? 'selected' : ''} key={index} onClick={() => setBuildingType(option.type)}>
                            <h1>{option.type}</h1>
                            {option.description && <p>{option.description}</p>}
                        </li>
                    ))}
                </ul>
                <Footer step={2} prevHref='/room/register/large-building' isValid={!!buildingType} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Building