import styled from 'styled-components';

export const DetailPictureWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    .detail-pic-cover {
      opacity: 1;
    }
    .div-pic-item:hover {
      .detail-pic-cover {
        opacity: 0;
      }
    }
  }
  .picture-left {
    /* width: 50%; */
    height: 742px;
    flex: 1;
    
  }
  .picture-right {
    flex: 1;
    height: 742px;
    /* width:50%; */
    display: flex;
    flex-wrap: wrap;
  }
  .div-pic-item {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #222;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      &:hover {
        transition: all 250ms ease;
        transform: scale(1.1);
      }
    }
    &.right {
      width: 50%;
      height: 50%;
    }
  }

  .detail-pic-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    opacity: 0;
    transition: opacity 250ms ease;
  }

  .operation-btn {
    position: absolute;
    right: 20px;
    bottom: 40px;
    font-size: 14px;
    color: #333;
    padding: 8px 12px;
    background: #f4f4f4;
    border-radius: 4px;
    cursor: pointer;
  }
`;