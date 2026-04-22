import styled from "styled-components";

export const SkeletonWrapper = styled.div`
  padding: 28px 0 16px;

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

  .section-head {
    margin-bottom: 22px;
  }

  .title {
    width: 180px;
    height: 34px;
    border-radius: 4px;
  }

  .subtitle {
    width: 150px;
    height: 18px;
    margin-top: 12px;
    border-radius: 4px;
  }

  .tab-row {
    display: flex;
    gap: 16px;
    margin-bottom: 22px;
    overflow: hidden;
  }

  .tab {
    flex: 0 0 150px;
    height: 36px;
    border-radius: 4px;
  }

  .card-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }

  @keyframes skeleton-loading {
    100% {
      transform: translateX(100%);
    }
  }

  @media screen and (max-width: 750px) {
  }
`;
