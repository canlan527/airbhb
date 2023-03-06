import styled from 'styled-components'

export const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  /* color: var(--primary-color); */
  color: ${(props) => props.theme.color.primaryColor };

  .logo{
    margin-left: 24px;
    cursor: pointer;
  }
  .text-logo {
    width:162px;
    height: 20px;
    padding-left: 12px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
`;