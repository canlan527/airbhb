import styled from 'styled-components';

export const FooterWrapper = styled.div`
border-top: 1px solid #eee;
  .content {
    width:1080px;
    padding: 35px 22px;
    box-sizing: border-box;
    display: flex;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
    .list {
      flex: 1;
      color: ${prop => prop.theme.text.lightColor};
      margin: 0 4px;
      .title {
        margin-bottom: 12px;
        font-size: 18px;
        font-weight: 600;
        color: ${prop => prop.theme.text.primaryColor}
      }
      .item {
        font-size: 12px;
        margin-bottom: 4px;
      }
    }
  }
  .bottom {
    width:1080px;
    padding: 24px 0;
    margin: 0 auto;
    font-size: 14px;
    color: ${prop => prop.theme.text.lightColor};
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`;