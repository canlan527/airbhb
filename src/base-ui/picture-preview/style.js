import styled from "styled-components";

export const PreviewWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: #333;
  transition: all 250ms ease;
  z-index: 99;
  .preview-top {
    height: 100px;
    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      display: inline-block;
      cursor: pointer;
    }
  }

  .preview-main {
    flex: 1;
    position: relative;
    min-height: 300px;
    .arrow-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .arrow-btn {
        color: #fff;
        cursor: pointer;
        &.left {
        }
        &.right {
        }
      }
    }
    .preview-picture {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      width: 100%;
      max-width: 105vh;
      overflow: hidden;
      cursor: pointer;
      user-select: none;
      /* transition: all 1500ms ease; */

      img {
        width: 100%;
        height: 100%;
        object-fit: content;
      }
    }
  }
  .preview-indicator {
    width: 100%;
    height: 200px;
    background: tan;
    margin: 20px 0 40px;
  }

  .fade-enter {
    opacity: .7;
    transform: translateX(
      ${(props) => (props.direction === "next" ? "50%" : "-50%")}
    );
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 150ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: .7;
    transition: all 150ms;

  }
`;
