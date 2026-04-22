import styled from "styled-components";

export const CardSkeletonWrapper = styled.div`
  width: ${(props) => props.itemWidth};
  padding: 8px;
  margin: 8px 0;
  box-sizing: border-box;

  .skeleton-block {
    position: relative;
    overflow: hidden;
    background: #edf0f2;
  }

  .skeleton-block::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
    animation: skeleton-loading 1.2s ease-in-out infinite;
  }

  .cover {
    width: 100%;
    aspect-ratio: 3 / 2;
    border-radius: 18px;
  }

  .meta {
    width: 48%;
    height: 18px;
    margin-top: 12px;
    border-radius: 4px;
  }

  .title {
    width: 92%;
    height: 22px;
    margin-top: 10px;
    border-radius: 4px;
  }

  .price {
    width: 26%;
    height: 20px;
    margin-top: 10px;
    border-radius: 4px;
  }

  @keyframes skeleton-loading {
    100% {
      transform: translateX(100%);
    }
  }

  @media screen and (min-width: 350px) and (max-width: 750px) {
    width: 100%;
  }
`;
