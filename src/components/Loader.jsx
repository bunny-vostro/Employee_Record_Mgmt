import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;  
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  position: relative;
  min-width: 320px;
  z-index: 10;
  margin-bottom: 100px;
  background: white;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`; 

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;

const Loader = () => (
     <Background>
        <ModalWrapper>
            <ModalCard>
                Loading...
            </ModalCard>
        </ModalWrapper>
    </Background>
);

export default Loader;