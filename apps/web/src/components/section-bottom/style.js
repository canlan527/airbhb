import styled from "styled-components";

export const BottomWrapper = styled.div`
  color: ${props => props.color};
  margin: 18px 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0;
  cursor: pointer;

  .text {
    margin-right: 6px;
    &:hover {
      color: #008489;
      text-decoration: underline;
    }
  }
  .text:hover+.icon { //鼠标悬停在A元素时，改变与A相邻的兄弟元素B的样式（A必须与B 相邻）
    color: #008489;
  }
`;
