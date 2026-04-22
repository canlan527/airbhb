import styled from 'styled-components'

export const ProfileWrapper = styled.div`
  width: 1120px;
  max-width: calc(100vw - 48px);
  min-height: 70vh;
  margin: 120px auto 48px;

  .profile-card,
  .content-card {
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .profile-head {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: center;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 8px;
  }

  p {
    color: #717171;
    margin-bottom: 12px;
  }

  img {
    height: 180px;
    object-fit: cover;
  }
`
