import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { largeBuildingTypeList, apartmentBuildingTpyeList, houstBuildingTypeList, secondaryUnitBuildingTypeList, uniqueSpaceBuildingTypeList, bnbBuildingTypeList, boutiquesHotelBuildingTypeList, roomTypeList } from '../../../lib/staticData';

const Container = styled.div`
    padding: 62px 30px 100px;
    h2 {
        font-size: 19px;
        font-weight: 800;
        margin-bottom: 56px;
    }
    h3 {
        font-weight: bold;
        color: ${palette.gray_76};
        margin-bottom: 6px;
    }

    .selector-wrapper {
        width: 320px;
        margin-bottom: 32px;
        & > p {
            font-size: 16px;
            color: ${palette.gray_76};
            font-weight: 600;
            margin-bottom: 8px
        }
        select {
            width: 100%;
            height: 56px;
            background-color: white;
            border: 1px solid ${palette.gray_b0};
            padding: 0 14px 0 12px;
            border-radius: 8px;
            outline: none;
            -webkit-appearance: none;
            background: url('/static/svg/common/selector/selector_down_arrow.svg') no-repeat right 14px center;
            font-size: 16px;
            &:focus {
                border-color: ${palette.dark_cyan};
            }
            &:disabled {
                background-image: '/static/svg/common/selector/disabled_register_selector_down_arrow.svg';
                background-color: ${palette.gray_f7};
                border-color: ${palette.gray_e5};
                color: ${palette.gray_e5};
                cursor: not-allowed;
            }
        }
    }   

    .etc-wrapper {
        width: 480px;
        margin-bottom: 50px;
        & > p {
            font-size: 16px;
            color: ${palette.gray_76};
            font-weight: 600;
            margin-bottom: 32px
        }
        .radio-wrapper {
            display: flex;

            label {
                margin-left: 10px;
                h1 {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
            }  
        }
        .radio-wrapper + .radio-wrapper {
            margin-top: 20px;
        }
        span {
            font-family: Noto Sans, Noto Sans KR !important;
        }
    }
`;

const Footer = styled.div`
    position: fixed;
    display: flex;
`

const RegisterRoomBuilding: React.FC = () => {
    const validationSchema = Yup.object({
        largeBuildingType: Yup.string().required('옵션을 선택하세요.'),
        buildingType: Yup.string().required('옵션을 선택하세요.')
    })

    const formik = useFormik({
        initialValues: {
            largeBuildingType: '',
            buildingType: '',
            roomType: '',
            isSetUpForGuest: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log({ ...values })
        }
    })

    // 건물유형 추출
    const getBuildingTypeList = useCallback(() => {
        switch (formik.values.largeBuildingType) {
            case '아파트':
                return apartmentBuildingTpyeList;
            case '주택':
                return houstBuildingTypeList;
            case '별채':
                return secondaryUnitBuildingTypeList;
            case '독특한 숙소':
                return uniqueSpaceBuildingTypeList;
            case 'B&B':
                return bnbBuildingTypeList;
            case '부티크호텔':
                return boutiquesHotelBuildingTypeList;
            default:
                return []
        }
    }, [formik.values.largeBuildingType])


    return (
        <Container>
            <h2>등록할 숙소 종류는 무엇인가요?</h2>
            <h3>1단계</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="selector-wrapper">
                    <p>우선 범위를 좁혀볼까요?</p>
                    <select
                        name='largeBuildingType'
                        onChange={formik.handleChange}
                        value={formik.values.largeBuildingType}
                    >
                        <option value={''} disabled>하나를 선택해주세요.</option>
                        {largeBuildingTypeList.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="selector-wrapper">
                    <p>건물 유형을 선택하세요</p>
                    <select
                        name='largeBuildingType'
                        onChange={formik.handleChange}
                        value={formik.values.buildingType}
                        disabled={formik.values.largeBuildingType === ''}
                    >
                        <option value={''} disabled>하나를 선택해주세요.</option>
                        {getBuildingTypeList()?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="etc-wrapper">
                    <p>게스트가 묵게 될 숙소 유형을 골라주세요.</p>
                    {roomTypeList.map((roomType, index) => (
                        <div className='radio-wrapper' key={index}>
                            <Radio
                                checked={roomType.value === formik.values.roomType}
                                onChange={formik.handleChange}
                                value={roomType.value}
                                name="roomType"
                            />
                            <label>
                                <h1>{roomType.label}</h1>
                                <p>{roomType.description}</p>
                            </label>
                        </div>
                    ))}
                </div>

                <div className="etc-wrapper">
                    <p>게스트만 사용하도록 만들어진 숙소인가요?</p>
                    <div className='radio-wrapper'>
                        <FormControl>
                            <RadioGroup
                                name="isSetUpForGuest"
                                value={formik.values.isSetUpForGuest}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="예, 게스트용으로 따로 마련된 숙소입니다." />
                                <FormControlLabel value={false} control={<Radio />} label="아니요, 제 개인 물건이 숙소에 있습니다." />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                
                <Footer>
                        <button>뒤로가기</button>
                        <button>다음</button>

                </Footer>
            </form>
        </Container>
    )
}

export default RegisterRoomBuilding