import styled from "styled-components";

export const EntireRoomListWrapper = styled.div`
  margin-top: 118px;
  padding: 30px 0;
  position: relative;
  .entire-desc {
    font-weight: 700;
  }
  .entire-room-list {
    display: flex;
    flex-wrap: wrap;
  }
  .entire-room-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, .77);
  }
`;