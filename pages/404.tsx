import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
`

const Custom404  = () => {
  return (
    <Container>404 | 페이지를 찾을수 없어요</Container>
  )
}

export default Custom404;