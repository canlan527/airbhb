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

  @media screen and (max-width: 1024px) {
    .btn {
      width: 44px;
      height: 44px;

      &.left-btn {
        left: -18px;
      }

      &.right-btn {
        right: -18px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: 16px;

    .btn {
      width: 40px;
      height: 40px;

      &.left-btn {
        left: -12px;
      }

      &.right-btn {
        right: -12px;
      }
    }
  }

  @media screen and (max-width: 560px) {
    .btn {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }
  }
`;
