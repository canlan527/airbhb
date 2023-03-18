import styled from 'styled-components';

export const PreviewWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:#333;
  transition: all 250ms ease;
  z-index: 99;
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`;