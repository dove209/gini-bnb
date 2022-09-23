import React, {  useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { fadeUp } from './FadeUpAnimation';

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
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50%;
            max-height: calc(100% - 160px);
            animation: ${fadeUp('50%', '45%')} 0.8s ease-in-out forwards;
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
                &:hover {
                    border-color: ${palette.black};
                }
                &.selected {
                    border-color: ${palette.black};
                    background-color: ${palette.gray_f7}
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
    const { 
        largeBuildingType: storedLargeBuildingType, 
        buildingType: storedBuildingType,
        setBuildingType
    } = useRegisterRoomStore(
        (state) => ({ 
            largeBuildingType: state.largeBuildingType,
            buildingType: state.buildingType,
            setBuildingType: state.setBuildingType
        }),
        shallow
    );
    
    const [buildingTypeList, setBuildingTypeList] = useState<{ type:string; description?: string; }[]>([]);
    const [building, setBuilding] = useState<string>();  // 숙소 문구 선택


    useLayoutEffect(() => {
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

    useLayoutEffect(() => {
        setBuilding(storedBuildingType)
    },[storedBuildingType])

    const onClickNextButton = () => {
        if(!!building) {
            setBuildingType(building);
            router.push('/room/register/privacy-type');
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
                        <li className={option.type === building ? 'selected' : ''} key={index} onClick={() => setBuilding(option.type)}>
                            <h1>{option.type}</h1>
                            {option.description && <p>{option.description}</p>}
                        </li>
                    ))}
                </ul>
                <Footer step={2} prevHref='/room/register/large-building' isValid={!!building} >
                    <button className={'next-button'} onClick={onClickNextButton}>다음</button>
                </Footer>
            </div>
        </Container>
    )
}

export default Building