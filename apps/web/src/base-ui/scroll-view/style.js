import styled from "styled-components";

export const ViewWrapper = styled.div`
  position: relative;
  margin: 20px 0 0;
  .scroll-content {
    transform: translateY(-10px);
    overflow: hidden;
  }
  .btn {
    position: absolute;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
    font-size: 16px;
    cursor: pointer;
    ${(props) => props.theme.mixin.boxShadow}
    z-index: 9;
    &.left-btn {
      left: -25px;
      transform: translateY(-50%);
    }
    &.right-btn {
      right: -25px;
      transform: translateY(-50%);
    }
  }
`;
