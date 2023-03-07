import styled from "styled-components";

export const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  color: ${(props) => props.theme.text.primaryColor};
  margin-right: 24px;
  .menu-left {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 14px;
    .menu-left-item {
      padding: 12px;
      border-radius: 22px;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .menu-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5px 5px 12px;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 21px;
    ${prop => prop.theme.mixin.boxShadow}

    .menu-right-item {
      border-radius: 22px;
      color: #666;
      &:hover {
        background: #f5f5f5;
      }
      &.right {
        margin-left: 12px;
      }

      
    }

    .panel {
        position: absolute;
        right:0;
        top: 52px;
        width:240px;
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 0 6px rgba(0,0,0,.1);
        .panel-top, .panel-bottom {
          padding:8px 0;
          
          .panel-item {
            padding: 12px ;

            &:hover {
              background: #f5f5f5;
            }

            &.login {
              font-weight: bold;
            }
          }
        }
        .panel-top {
          border-bottom : 1px solid #ddd;
        }
      }

  }
`;
