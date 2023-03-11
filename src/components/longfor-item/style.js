import styled from "styled-components";

export const ItemWrapper = styled.div`
  width: 240px;
  height: 320px;
  margin-right: 16px;
  flex-shrink: 0;
  position: relative;
  ${props => props.theme.mixin.boxShadow};
  &:last-child {
    margin-right: 0;
  }
  .longfor-shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), 20%, transparent);
    border-radius: 16px;
    cursor: pointer;
  }

  .longfor-img {
    width: 100%;
    height: 100%;
    img {
      border-radius: 16px;
      width: 100%;
      height: 100%;
    }
  }

  .longfor-item-info {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-35%);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .item-city {
      font-size: 18px;
      font-weight: bolder;
      line-height: 32px;
      letter-spacing: 4px;
    }
  }
`;
