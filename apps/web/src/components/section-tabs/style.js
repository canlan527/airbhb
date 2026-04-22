import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  transition: all 200ms ease;
  .tabs-item {
    flex-basis: 150px;
    flex-shrink: 0;
    background: #fff;
    padding: 8px 12px;
    margin-right: 16px;
    font-size:16px;
    border: 1px solid #008489;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    ${props => props.theme.mixin.boxShadow};

    &:last-of-type {
      margin-right: 0;
    }
    
    &.active {
      color:#fff;
      background: #008489;
    }
  }
`;