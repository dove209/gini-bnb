import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { largeBuildingTypeList, apartmentBuildingTpyeList, houstBuildingTypeList, secondaryUnitBuildingTypeList, uniqueSpaceBuildingTypeList, bnbBuildingTypeList, boutiquesHotelBuildingTypeList, roomTypeList } from '../../../lib/staticData';

import { useRegisterRoomStore } from '../../../stores/useRegisterRoomStore';
import Footer from './Footer';

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
        b {
            color: ${palette.bittersweet}
        }
    }

    .register-room-stage-info {
        font-size: 14px;
        max-width: 400px;
        margin-bottom: 24px;
        max-width: 400px;
    }


`;


const Bedrooms: React.FC = () => {
    const router = useRouter();
    const { } = useRegisterRoomStore();



    return (
        <Container>
            <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
            <h3><b>2단계</b> / 11단계</h3>
            <p className="room-register-stage-info">
                모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지 확인하세요.
            </p>

            <Footer prevHref='/'>
                    <button className='next-button' type='submit'>다음</button>
                </Footer>

        </Container>
    )
}

export default Bedrooms