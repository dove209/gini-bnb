import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color:red;
    flex: 1;
    margin-left: 100px;
    position: relative;
    .box {
        position: sticky;
        top: 100px;
        width: 100%;
        height: 400px;
        background-color: blue;

    }
`;

const RoomDetailReservation = () => {
  return (
    <Container>
        <div className="box">
            asdasdlkjaslkdjaskdjlksajlkdjlsakjdk
        </div>
    </Container>
  )
}

export default RoomDetailReservation