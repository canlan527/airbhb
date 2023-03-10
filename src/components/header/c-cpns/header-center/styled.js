import styled from 'styled-components'

export const CenterWrapper = styled.div`

  .search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:300px;
    height:48px;
    box-sizing: border-box;
    padding: 0 8px;
    border: 1px solid #ddd;
    border-radius: 24px;
    cursor: pointer;

    ${props => props.theme.mixin.boxShadow}
    
    .text {
      padding: 0 16px;
      color: #222;
      font-weight: bold;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: ${props => props.theme.color.primaryColor};
      color: #fff;
      border-radius: 50%;
    }
  }
`;